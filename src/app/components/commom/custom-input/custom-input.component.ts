import { AfterContentChecked, AfterContentInit, Component, ElementRef, forwardRef, Injector, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericUtils } from './generic-utils';
import { getErrorMessage, RadioValue } from './form-utils';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor, AfterContentInit, AfterContentChecked {

  @Input()
  idComponent: string;

  @Input()
  label: string;

  @Input()
  inputType: string;

  @Input()
  formControlName: string;

  @Input()
  customMask: string;

  @Input()
  patterns: any;

  @Input()
  hideLabel: boolean;

  @Input()
  options: any[];

  @Input()
  noBorder: boolean;

  @Input()
  format: string;

  @Input()
  upperCase: boolean;

  @Input()
  maxLength: string;

  @Input()
  isEmail: boolean;

  @Input()
  tooltip: string;

  @Input()
  lfill: number;

  @Input()
  oldValue: any;

  @Input()
  canShowChanges: boolean;

  @Input()
  colorOnChange: string;

  @Input()
  allowSpecialCharacteres: boolean;

  @Input()
  radioValues: RadioValue[] = [];

  @Input()
  groupname: string;

  @Input()
  valueCheckbox: any;

  @Input()
  labelCheckbox: string;

  @Input()
  externError = false;

  value: any = '';

  @Input()
  isDisabled: boolean;

  @Input()
  showButtonSearch: boolean;

  control: FormControl;
  isRequired: boolean;

  propagateChange: Function;
  propagateTouched: Function;

  constructor(
    private inj: Injector,
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit() {
    this.control = this.inj.get(NgControl).control;
    this.isRequired = this.ifIsRequired();
  }

  ngAfterContentChecked() {
    this.isRequired = this.ifIsRequired();
  }

  writeValue(value: any) {
    if (value || value === 0) {
      if (this.inputType === 'radio' || this.inputType === 'switch') {
        this.value = value;
      } else if (this.inputType === 'datepicker') {
        this.value = new Date(value);
      } else if (this.inputType === 'checkbox') {
        this.value = value === 'X';
      } else if (this.inputType === 'number') {
        this.value = String(value).replace('.', ',');
      } else if (this.customMask) {
        if (this.upperCase) {
          value = String(value).toUpperCase();
        }
        if (this.lfill) {
          this.value = `${Array(this.customMask.length - value.length).fill('0').join('')}${value}`;
          this.propagateChange(`${Array(this.customMask.length - value.length).fill('0').join('')}${value}`);
        } else {
          this.value = value;
        }
        setTimeout(() => this.elementRef.nativeElement.querySelector('input').dispatchEvent(new Event('change')));
      } else if (!this.isEmail) {
        if (this.upperCase) {
          value = String(value).toUpperCase();
        }
        if (this.allowSpecialCharacteres) {
          this.value = value;
        } else {
          this.value = GenericUtils.cleanStringViewEngine(String(value));
          setTimeout(() => this.propagateChange(this.value));
        }
      } else {
        value = String(value).toLowerCase();
        this.value = GenericUtils.cleanEmailViewEngine(value);
      }
    } else {
      if (this.inputType === 'checkbox') {
        this.value = false;
      } else {
        this.value = '';
      }
    }

    if (this.inputType === 'checkbox'
    && this.elementRef.nativeElement.querySelector(`input[name='${this.formControlName}']`)) {
      this.elementRef.nativeElement.querySelector(`input[name='${this.formControlName}']`).checked = this.value;
    }
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onChange(event: any) {
    const value = event.target.value as string;
    if (this.lfill && this.customMask && value) {
      this.value = `${Array(this.customMask.length - value.length).fill('0').join('')}${value}`;
      this.propagateChange(`${Array(this.customMask.length - value.length).fill('0').join('')}${value}`);
    } else {
      this.propagateChange(value);
    }
  }

  onFocus(event: any) {
    this.propagateTouched(event);
  }

  onInput(event: any) {
    if (event.target.value) {
      const pos = event.target.selectionStart;
      setTimeout(() => {
        const element = this.elementRef.nativeElement.querySelector(`input[name='${this.formControlName}']`);
        if (element) {
          element.selectionStart = pos;
          element.selectionEnd = pos;
        }
      });

      if (this.isEmail) {
        const value = String(event.target.value).toLowerCase();
        event.target.value = GenericUtils.cleanEmailViewEngine(value);
      } else if (event && event.target && event.target.value) {
        if (this.upperCase) {
          event.target.value = String(event.target.value).toUpperCase();
        }

        if (!this.customMask) {
          if (this.inputType === 'letters') {
            event.target.value = String(event.target.value).replace(/\d+/, '');
          }

          if (!this.allowSpecialCharacteres) {
            event.target.value = GenericUtils.cleanStringViewEngine(String(event.target.value));
          }
        }
      }
    }
  }

  onDatePickerChange(date: Date) {
    this.propagateChange(date ? date.toISOString() : null);
  }

  onCheckboxChange(event: any): void {
    this.propagateChange(event.target.checked ? 'X' : '');
  }

  getErrorMessage(): string {
    const { control } = this;
    return getErrorMessage(control);
  }

  isChanged(): string | boolean {
    if (this.canShowChanges) {
      if (this.inputType !== 'number') {
        if (GenericUtils.cleanStringViewEngine(this.oldValue || '').replace(/\s+/g, '')
          !== GenericUtils.cleanStringViewEngine(this.value).replace(/\s+/g, '')) {
            return this.colorOnChange;
        }
      } else {
        if (parseInt((this.oldValue || '0').replace('.', ','), 10)
          !== parseInt((this.value || '0').replace('.', ','), 10)) {
            return this.colorOnChange;
        }
      }
    }
    return false;
  }

  isFocused(): boolean {
    return document.activeElement && document.activeElement.getAttribute('name') === this.formControlName;
  }

  ifIsRequired(): boolean {
    const validators = this.control && this.control.validator && this.control.validator(<AbstractControl>{});
    return !!(validators && validators.hasOwnProperty('required'));
  }

}
