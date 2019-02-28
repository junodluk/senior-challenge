import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { MenuComponent } from "./menu/menu.component";
import { RouterModule } from "@angular/router";
import { TieredMenuModule } from "primeng/tieredmenu";
import { CommonModule } from "@angular/common";
import { HeaderModule } from "./header/header.module";
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    CardModule,
    TieredMenuModule
  ],
  declarations: [
    MainComponent,
    MenuComponent
  ],
  exports: [
    MainComponent
  ],
  providers: [

  ]
})
export class MainModule { }