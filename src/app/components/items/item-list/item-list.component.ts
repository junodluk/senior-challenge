import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import * as Responses from '../../../models/response.model';
import { ItemModel, ItemUnit } from '../../../models/item.interface';
import { ItemService } from '../../../services/item.service';
import { ViewList } from '../../commom/view-list/models/view-list';
import { ButtonAction } from '../../commom/view-list/grid/button-action';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  private readonly path = '/items';
  itemUnitOptions = ItemUnit;
  filterForm: FormGroup;
  view: ViewList;
  items: ItemModel[] = [];

  breadCrumbItems = [
    { label: 'Item List', routerLink: ['/items/list'] },
  ];
  breadCrumbHome: MenuItem = { icon: 'fab fa-fort-awesome-alt', routerLink: ['/'] };

  private subscribers: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private itemService: ItemService
  ) {
    this.itemUnitOptions = [{ name: 'Todas', suffix: '', precision: 0, value: null }, ...this.itemUnitOptions];
    this.buildView();
    this.buildBehaviors();
  }

  ngOnInit() {
    this.filterForm = this._fb.group({
      name: [null],
      unit: [null],
      perishable: [null],
    });

    this.filter();
  }

  ngOnDestroy() {
    for (const subscriber of this.subscribers) {
      subscriber.unsubscribe();
    }
  }

  onClickNew(): void {
    this.router.navigate([`${this.path}/new`]);
  }

  onClickEdit(item: ItemModel): void {
    this.router.navigate([`${this.path}/edit`, item.id]);
  }

  onClickDelete(item: ItemModel): void {
    this.confirmationService.confirm({
      header: 'Excluir Item',
      message: 'Deseja excluir este Item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.itemService.delete(item.id);
      }
    });
  }

  filter() {
    this.itemService.query(this.filterForm.getRawValue() as ItemModel);
  }

  private buildView(): void {
    let viewButtons = [{
      caption: 'Novo Item',
      btnClass: 'btn-green',
      iconClass: 'fas fa-plus',
      onClick: () => this.onClickNew()
    }] as ButtonAction[];

    let viewList = this.itemService.getViewOptions(viewButtons, '', false, false);
    viewList.columns = viewList.columns.map(c => {
      c.enumOptions = (c.property == 'unit' ? ItemUnit : null)
      return c;
    });
    viewList.columns.push({
      property: '',
      label: '',
      type: 'button',
      width: 61,
      buttons: [
        { caption: '', btnClass: 'btn-green icon-only', iconClass: 'fas fa-pen', onClick: (element) => this.onClickEdit(element) },
        { caption: '', btnClass: 'btn-red icon-only', iconClass: 'fas fa-trash', onClick: (element) => this.onClickDelete(element) }
      ],
      dropdownButtons: false,
      sortable: false,
      orderable: false
    });

    this.view = viewList;
  }

  private buildBehaviors(): void {
    this.itemService.getItemListBehavior.next({ state: 'notLoaded' });
    this.subscribers.push(this.itemService.getItemListBehavior
      .subscribe((response: Responses.ResponseData<ItemModel[]>) => {
        if (Responses.isResponseDataLoading(response)) {
          this.spinner.show();
        } else if (Responses.isResponseDataOk(response)) {
          this.items = response.data;
          this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.spinner.hide();
        }
      }));

    this.itemService.deleteItemBehavior.next({ state: 'notLoaded' });
    this.subscribers.push(this.itemService.deleteItemBehavior
      .subscribe(response => {
        if (Responses.isResponseDataLoading(response)) {
          this.spinner.show();
        } else if (Responses.isResponseDataOk(response)) {
          this.messageService.add({
            severity: 'success',
            summary: 'Itens',
            detail: 'Item removido com sucesso!'
          });
          this.filter();
          // this.spinner.hide();
        } else if (Responses.isResponseDataError(response)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Itens',
            detail: 'Ocorreu um erro ao remover este ítem!'
          });
          this.spinner.hide();
        }
      }));
  }

}
