import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemModel } from '../models/item.interface';
import { ResponseData } from '../models/response.model';
import { StorageService } from './storage.service';
import { ButtonAction } from '../components/commom/view-list/grid/button-action';
import { ViewList } from '../components/commom/view-list/models/view-list';
import { GridColumn } from '../components/commom/view-list/grid/grid-column';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private store: StorageService) { }

  getItemBehavior = new BehaviorSubject<ResponseData<ItemModel>>({ state: 'notLoaded' });
  getItemListBehavior = new BehaviorSubject<ResponseData<ItemModel[]>>({ state: 'notLoaded' });
  saveItemBehavior = new BehaviorSubject<ResponseData<ItemModel>>({ state: 'notLoaded' });
  updateItemBehavior = new BehaviorSubject<ResponseData<boolean>>({ state: 'notLoaded' });
  deleteItemBehavior = new BehaviorSubject<ResponseData<boolean>>({ state: 'notLoaded' });

  // ATENÇÃO! 
  // No retorno das requisições é utilizado setTimeout unica e exclusivamente com fins visuais para exibir o loader/spinner

  get(id: string): void {
    this.getItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    const itemIndex = itemData.findIndex(i => i.id === id);

    if (itemIndex >= 0) {
      console.log(itemData[itemIndex]);
      setTimeout(() => {
         this.getItemBehavior.next({ state: 'ok', data: itemData[itemIndex] });
      }, 500);
      
    } else {
      this.getItemBehavior.next({ state: 'error', error: 404 });
    }
  }

  query(queryOptions: ItemModel): void {
    this.getItemListBehavior.next({ state: 'loading' });

    console.log(queryOptions);

    let filteredData = [...this.store.getKey('item-data') as ItemModel[]];

    if (queryOptions.name)
      filteredData = [...filteredData.filter((item) => item.name.indexOf(queryOptions.name) > -1)];

    if (queryOptions.unit && queryOptions.unit['value'])
      filteredData = [...filteredData.filter((item) => item.unit == queryOptions.unit['value'])];

    if (queryOptions.perishable != null)
      filteredData = [...filteredData.filter((item) => item.perishable == queryOptions.perishable)];

    if (filteredData != null) {
      setTimeout(() => {
        this.getItemListBehavior.next({ state: 'ok', data: filteredData });
      }, 500);
    } else {
      this.getItemListBehavior.next({ state: 'error', error: 500 });
    }
  }

  save(item: ItemModel): void {
    this.saveItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    if (!item.id) {
      item.id = this.generateGUID();
      itemData.push(item);
      this.store.setKey('item-data', itemData);

      setTimeout(() => {
        this.saveItemBehavior.next({ state: 'ok', data: { ...item } as ItemModel });
      }, 500);
    } else {
      this.saveItemBehavior.next({ state: 'error', error: 500 });
    }
  }

  update(id: string, item: ItemModel): void {
    this.updateItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    const itemIndex = itemData.findIndex(i => i.id === id);

    if (itemIndex >= 0) {
      let newState = itemData.map((it, index) => {
        return index != itemIndex ? it : { ...item, id };
      });
      this.store.setKey('item-data', newState);

      setTimeout(() => {
        this.updateItemBehavior.next({ state: 'ok', data: true });
      }, 500);
    } else {
      this.updateItemBehavior.next({ state: 'error', error: 404 });
    }
  }

  delete(id: string): void {
    this.deleteItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    const itemIndex = itemData.findIndex(i => i.id === id);

    if (itemIndex >= 0) {
      this.store.setKey('item-data', itemData.filter(i => i.id !== id));
      
      setTimeout(() => {
        this.deleteItemBehavior.next({ state: 'ok', data: true });
      }, 500);
    } else {
      this.deleteItemBehavior.next({ state: 'error', error: 404 });
    }
  }

  getViewOptions(buttons: ButtonAction[] = [], title = '', sortable: boolean = true, ordeable: boolean = true): ViewList {
    const columns = [
      {
        property: 'name',
        label: 'Item',
        type: 'text'
      },
      {
        property: 'unit',
        label: 'Unidade',
        type: 'enum'
      },
      {
        property: 'amount',
        label: 'Quantidade',
        type: 'text',
      },
      {
        property: 'price',
        type: 'currency',
        label: 'Preço',
      },
      {
        property: 'perishable',
        label: 'Perecível',
        type: 'boolean/icon',
        textAlign: 'center',
        width: 90
      },
      {
        property: 'expirationDate',
        label: 'Validade',
        type: 'date',
        textAlign: 'center',
        width: 85
      },
      {
        property: 'productionDate',
        label: 'Fabricação',
        type: 'date',
        textAlign: 'center',
        width: 100
      }
    ] as GridColumn[];

    const viewGridOptions = {
      title,
      columns,
      buttons
    } as ViewList;

    viewGridOptions.columns.map(c => {
      c.sortable = sortable;
      c.orderable = ordeable;
      return c;
    });

    return viewGridOptions;
  }

  generateGUID() {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }
}