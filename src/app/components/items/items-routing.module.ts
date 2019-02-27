import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ItemListComponent },
      { path: 'new', component: ItemFormComponent },
      { path: 'edit/:id', component: ItemFormComponent },
      { path: '**', redirectTo: 'list' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
