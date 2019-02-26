import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

var routes: Routes = [
  // {
  //     path: 'login',
  //     component: LoginComponent
  // },
  {
      path: '',
      component: MainComponent,
  //     children: [
  //         {
  //             path: 'registrations',
  //             loadChildren: './components/registration/registration.module#RegistrationModule',
  //         },
  //         {
  //             path: 'reports',
  //             loadChildren: './components/documents/report.module#ReportModule',
  //         },
  //         {
  //             path: 'manage-release',
  //             loadChildren: './components/manage-release/manage-release.module#ManageReleaseModule',
  //         },
  //         {
  //             path: 'queries',
  //             loadChildren: './components/query/query.module#QueryModule'
  //         },
  //         {
  //             path: 'mapa',
  //             loadChildren: './components/mapa/mapa.module#MapaModule',
  //         },
  //         {
  //             path: 'config',
  //             loadChildren: './components/configuration/configuration.module#ConfigurationModule'
  //         },
  //         {
  //             path: 'documentation',
  //             loadChildren: './components/documentation/documentation.module#DocumentationModule'
  //         }
  //     ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
