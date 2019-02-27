import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemModel } from '../models/item.interface';
import { ResponseData } from '../models/response.model';
import { StorageService } from './storage.service';

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

  get(id: string): void {
    this.getItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    const itemIndex = itemData.findIndex(i => i.id === id);

    if (itemIndex >= 0) {
      this.getItemBehavior.next({ state: 'ok', data: itemData[itemIndex] });
    } else {
      this.getItemBehavior.next({ state: 'error', error: 404 });
    }
  }

  query(queryOptions: any): void {
    this.getItemListBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];

    if (itemData != null) {
      this.getItemListBehavior.next({ state: 'ok', data: itemData });
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

      this.saveItemBehavior.next({ state: 'ok', data: { ...item } as ItemModel });
    } else {
      this.saveItemBehavior.next({ state: 'error', error: 500 });
    }
  }

  update(item: ItemModel): void {
    this.updateItemBehavior.next({ state: 'loading' });

    const itemData = this.store.getKey('item-data') as ItemModel[];
    const itemIndex = itemData.findIndex(i => i.id === item.id);

    if (itemIndex >= 0) {
      let newState = itemData.map((it, index) => {
        return index != itemIndex ? it : item;
      });
      this.store.setKey('item-data', newState);

      this.updateItemBehavior.next({ state: 'ok', data: true });
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
      this.deleteItemBehavior.next({ state: 'ok', data: true });
    } else {
      this.deleteItemBehavior.next({ state: 'error', error: 404 });
    }
  }

  generateGUID() {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }


}