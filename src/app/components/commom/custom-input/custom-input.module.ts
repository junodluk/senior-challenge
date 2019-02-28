import { ValidationMessageModule } from './validation-message/validation-message.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CustomInputComponent } from './custom-input.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AutoCompleteModule,
        NgxMaskModule.forRoot(),
        RadioButtonModule,
        InputSwitchModule,
        ChipsModule,
        MultiSelectModule,
        CheckboxModule,
        ValidationMessageModule,
        CurrencyMaskModule
    ],
    declarations: [
        CustomInputComponent
    ],
    exports: [
        CustomInputComponent
    ]
})
export class CustomInputModule {
}
