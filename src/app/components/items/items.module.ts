import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

import { ViewListModule } from '../commom/view-list/view-list.module';
import { FieldModule } from '../commom/custom-input/field/field.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SplitModule } from '../commom/split/split.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [ItemListComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ViewListModule,
    SplitModule,
    FieldModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    CurrencyMaskModule,
    BreadcrumbModule
  ]
})
export class ItemsModule { }
