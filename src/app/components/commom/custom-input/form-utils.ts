import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

export interface RadioValue {
  label: string;
  value: any;
}

export function getErrorMessage(control: FormControl) {
  if (control && control.invalid && (control.dirty || control.touched) && control.errors) {
    if (control.errors.required) {
      return 'Campo obrigatório';
    }
    if (control.errors.min) {
      return `Valor precisa ser no mínimo ${control.errors.min.min}`
    }
    if (control.errors.email) {
      return 'E-mail inválido';
    }
    if (control.errors.percent) {
      return 'Porcentagem inválida (Min: 0 - Max: 100)';
    }
    if (control.errors.minlength) {
      return `Informação inválida`;
    }
    if (control.errors.maxlength) {
      return `Total de caracteres excedido (Máximo: ${control.errors.maxlength.requiredLength})`;
    }
    if (control.errors.dateFromInvalid) {
      return 'Data de Validade menor que Data de Fabricação';
    }
    if (control.errors.validDateTo) {
      return 'Data de Fabricação maior que Data de Validade';
    }
    if (control.errors.dateAboveCurrentDateInvalid) {
      return 'Data superior a atual';
    }
    if (control.errors.dateLowerThanToday) {
      return 'Data de Validade inferir a data atual';
    }
    if (control.errors.invalidDate) {
      return 'Data inválida';
    }
  }
  return '';
}

export const validDateTo = (initialDateControl: AbstractControl): ValidatorFn => {
  return (finalDateControl: AbstractControl): { [key: string]: any } | null => {
    if (finalDateControl.value && initialDateControl.value && finalDateControl.value > initialDateControl.value) {
      return {
        validDateTo: true
      }
    }
  
    return null;
  };
}

export const dateLowerThanToday = (): ValidatorFn => {
  return (dateControl: AbstractControl): { [key: string]: any } | null => {
    if (dateControl.value && new Date() && dateControl.value > new Date()) {
      return {
        dateLowerThanToday: true
      }
    }
  
    return null;
  };
}