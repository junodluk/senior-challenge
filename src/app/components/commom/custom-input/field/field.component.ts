import { getErrorMessage } from '../form-utils';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Input()
  label: string;

  @Input()
  hideLabel: boolean = false;

  @Input()
  isRequired: boolean;

  @Input()
  controlRef: any;

  getErrorMessage(): string {
    const { controlRef } = this;
    return getErrorMessage(controlRef);
  }

}
