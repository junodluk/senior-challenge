import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { calendarConfig } from 'src/app/utils/primeng.config';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import * as Responses from '../../../models/response.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemModel, ItemUnit } from 'src/app/models/item.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  private readonly path = '/items';
  calendarConfig = calendarConfig;
  itemUnitOptions = ItemUnit;
  
  itemForm: FormGroup;

  itemId: string = '';

  private readonly subscribers: Subscription[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _fb: FormBuilder,
    private itemService: ItemService
  ) {
    this.itemUnitOptions = [...this.itemUnitOptions];

    this.itemForm = this._fb.group({
      name: ['', Validators.required],
      expirationDate: ['', Validators.required],
      productionDate: ['', Validators.required],
      unit: [null, Validators.required]
    });

    this.itemId = route.snapshot.queryParams['id'] || '';
    if (this.itemId) {
      itemService.get(this.itemId);
    }

    this.buildBehaviors();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    for (const subscriber of this.subscribers) {
      subscriber.unsubscribe();
    }
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
    }
  }

  prepareValue(model: ItemModel): ItemModel {
    const unit = ItemUnit.find((i) => i.value == model.unit['value']).value;
    const result = {
      name: model.name,
      unit: unit,
      expirationDate: model.expirationDate,
      productionDate: model.productionDate,
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
          let { name = '' } = response.data as ItemModel;
          this.itemForm.get('name').setValue(name);
          this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.spinner.hide();
        }
      }));
  }

}
