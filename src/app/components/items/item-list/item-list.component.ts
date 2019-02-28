import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  filterForm: FormGroup;
  view: ViewList;
  items: ItemModel[] = [];

  private subscribers: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private itemService: ItemService
  ) {
    this.buildView();
    this.buildBehaviors();
  }

  ngOnInit() {
    this.filterForm = this._fb.group({
      name: [''],
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

  onClickDelete(user: ItemModel): void {
    // this.confirmationService.confirm({
    //   header: 'Excluir usuário',
    //   message: 'Deseja excluir esse usuário?',
    //   acceptLabel: 'Sim',
    //   rejectLabel: 'Não',
    //   accept: () => {
    //     // this.itemService.delete(user.id);
    //   }
    // });
  }

  filter() {
    this.itemService.query({});
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
  }

}
