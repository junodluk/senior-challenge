import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'senior-challenge';

  constructor(private store: StorageService) {
    if (store.getKey('item-data') == null)
      store.setKey('item-data', []);
  }
}
