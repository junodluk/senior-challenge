import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { calendarConfig } from 'src/app/utils/primeng.config';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import * as Responses from '../../../models/response.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemModel, ItemUnit } from 'src/app/models/item.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { validDateTo, dateLowerThanToday } from '../../commom/custom-input/form-utils';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  private readonly path = '/items';
  calendarConfig = calendarConfig;
  itemUnitOptions = ItemUnit;

  breadCrumbItems = [
    { label: 'Item List', routerLink: ['/items/list'] },
  ];
  breadCrumbHome: MenuItem = { icon: 'fab fa-fort-awesome-alt', routerLink: ['/'] };

  itemForm: FormGroup;
  itemId: string = '';
  amountInputOptions: any = { prefix: '', suffix: '', precision: 0, thousands: '.', decimal: ',', align: 'left' };
  expirationDateRequired = false;
  itemExpired = false;

  private readonly subscribers: Subscription[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private _fb: FormBuilder,
    private itemService: ItemService
  ) {
    this.itemUnitOptions = [...this.itemUnitOptions];

    this.itemForm = this._fb.group({
      name: ['', Validators.required],
      expirationDate: [''],
      productionDate: ['', Validators.required],
      unit: [null, Validators.required],
      price: [0, Validators.min(0.01)],
      amount: [0],
      perishable: [false]
    });

    this.buildBehaviors();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.itemId = params.id;
        this.itemService.get(this.itemId);
      } else {
        this.itemId = '';
        this.breadCrumbItems = [...this.breadCrumbItems, { label: 'Novo Item', routerLink: ['/items/new'] }]
      }
    });
  }

  ngOnDestroy() {
    for (const subscriber of this.subscribers) {
      subscriber.unsubscribe();
    }
  }

  onChangeExpirationDate(event) {
    this.itemForm.controls["productionDate"].setValue(this.itemForm.controls["productionDate"].value);

    this.itemExpired = this.itemForm.controls["expirationDate"].value < new Date() && this.itemForm.controls["perishable"].value;
  }

  onChangeUnit({ value }) {
    this.amountInputOptions.suffix = ' ' + value.suffix;
    this.amountInputOptions.precision = ' ' + value.precision;
  }

  onChangePerishable(checked) {
    if (checked) {
      this.itemForm.controls["expirationDate"].setValidators([Validators.required]);
      this.itemForm.controls["productionDate"].setValidators([Validators.required, validDateTo(this.itemForm.controls["expirationDate"])]);
    } else {
      this.itemForm.controls["expirationDate"].setValidators([]);
      this.itemForm.controls["productionDate"].setValidators([Validators.required]);
    }

    this.itemForm.controls["expirationDate"].setValue(this.itemForm.controls["expirationDate"].value);
    this.itemForm.controls["productionDate"].setValue(this.itemForm.controls["productionDate"].value);
    this.expirationDateRequired = checked;
  }

  onCancel() {
    this.router.navigate([this.path]);
  }

  onSubmit() {
    if (this.itemForm.valid) {
      let model = this.prepareValue(this.itemForm.getRawValue());
      if (this.itemId) {
        this.itemService.update(this.itemId, model);
      } else {
        this.itemService.save(model);
      }
    } else {
      Object.values(this.itemForm.controls)
        .forEach(field => field.markAsTouched());
    }
  }

  prepareValue(model: ItemModel): ItemModel {
    const unit = ItemUnit.find((i) => i.value == model.unit['value']).value;
    const result = {
      ...model,
      unit: unit,
    } as ItemModel;

    return result;
  }

  private buildBehaviors(): void {
    this.itemService.getItemBehavior.next({ state: 'notLoaded' });
    this.subscribers.push(this.itemService.getItemBehavior
      .subscribe(response => {
        if (Responses.isResponseDataLoading(response)) {
          this.spinner.show();
        } else if (Responses.isResponseDataOk(response)) {
          let { name = '', perishable = false, unit = null, price = 0, amount = 0, expirationDate = null, productionDate = null } = response.data as ItemModel;
          let unitValue = ItemUnit.find((i) => i.value == unit);

          this.itemForm.get('name').setValue(name);
          this.itemForm.get('perishable').setValue(perishable);
          this.itemForm.get('price').setValue(price);
          this.itemForm.get('amount').setValue(amount);

          this.itemForm.get('expirationDate').setValue(new Date(expirationDate));
          this.itemForm.get('productionDate').setValue(new Date(productionDate));

          this.itemForm.get('unit').setValue(unitValue);
          this.onChangePerishable(perishable);
          this.onChangeUnit({ value: unitValue });

          this.breadCrumbItems = [...this.breadCrumbItems, { label: `Editando ${name ? name : 'Item'}`, routerLink: ['/items/edit', this.itemId] }]
          this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.spinner.hide();
        }
      }));

    this.itemService.saveItemBehavior.next({ state: 'notLoaded' });
    this.subscribers.push(this.itemService.saveItemBehavior
      .subscribe(response => {
        if (Responses.isResponseDataLoading(response)) {
          this.spinner.show();
        } else if (Responses.isResponseDataOk(response)) {
          this.messageService.add({
            severity: 'success',
            summary: 'Itens',
            detail: 'Item salvo com sucesso!'
          });
          this.router.navigate([this.path]);
          this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Itens',
            detail: 'Ocorreu um erro ao salvar este ítem!'
          });
          this.spinner.hide();
        }
      }));

    this.itemService.updateItemBehavior.next({ state: 'notLoaded' });
    this.subscribers.push(this.itemService.updateItemBehavior
      .subscribe(response => {
        if (Responses.isResponseDataLoading(response)) {
          this.spinner.show();
        } else if (Responses.isResponseDataOk(response)) {
          this.messageService.add({
            severity: 'success',
            summary: 'Itens',
            detail: 'Item modificado com sucesso!'
          });
          this.router.navigate([this.path]);
          this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Itens',
            detail: 'Ocorreu um erro ao modificar este ítem!'
          });
          this.spinner.hide();
        }
      }));
  }

}
