import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

var routes: Routes = [
  {
      path: '',
      component: MainComponent,
      children: [
        {
          path: 'items',
          loadChildren: './components/items/items.module#ItemsModule',
        },
      ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
