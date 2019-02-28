import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { LabelModule } from '../label/label.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';

@NgModule({
  imports: [
    CommonModule,
    LabelModule,
    ValidationMessageModule
  ],
  declarations: [FieldComponent],
  exports: [FieldComponent]
})
export class FieldModule { }
