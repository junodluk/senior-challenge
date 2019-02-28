import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './split.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SplitComponent],
  exports: [SplitComponent]
})
export class SplitModule { }
