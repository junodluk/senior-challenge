import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GridComponent } from './grid/grid.component';
import { ViewListComponent } from './view-list.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    NgbModule,
    CheckboxModule
  ],
  declarations: [
    GridComponent,
    ViewListComponent
  ],
  exports: [
    GridComponent,
    ViewListComponent
  ]
})
export class ViewListModule { }
