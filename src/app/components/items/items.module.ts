import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

import { ViewListModule } from '../commom/view-list/view-list.module';
import { CustomInputModule } from '../commom/custom-input/custom-input.module';
import { FieldModule } from '../commom/custom-input/field/field.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ItemListComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ViewListModule,
    CustomInputModule,
    FieldModule,
    CalendarModule,
    DropdownModule
  ]
})
export class ItemsModule { }
