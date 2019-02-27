import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setKey(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
    return this.getKey(key);
  }

  getKey(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  removeKey(key: string): any {
    return localStorage.removeItem(key);
  }
}
