import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  declarations: [ItemListComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
