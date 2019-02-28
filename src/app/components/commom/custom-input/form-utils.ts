import { FormControl } from '@angular/forms';

export interface RadioValue {
  label: string;
  value: any;
}

export function getErrorMessage(control: FormControl) {
    if (control && control.invalid && control.errors) {
        if (control.errors.documentInvalid) {
            if (control.errors.female) {
            return `${control.errors.type} inválida`;
            }
            return `${control.errors.type} inválido`;
        }
        if (control.errors.vehicleYearValid) {
            return 'Ano inválido'
        }
        if (control.errors.validRenavam) {
            return 'Renavam Inválido';
        }
        if (control.errors.validCpf) {
            return 'CPF Inválido';
        }
        if (control.errors.validCnpj) {
            return 'CNPJ Inválido';
        }
        if (control.errors.required) {
            return 'Campo obrigatório';
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
        if (control.errors.mobileInvalid) {
            return 'Celular inválido';
        }
        if (control.errors.phoneInvalid) {
            return 'Telefone inválido';
        }
        if (control.errors.maxlength) {
            return `Total de caracteres excedido (Máximo: ${control.errors.maxlength.requiredLength})`;
        }
        if (control.errors.dateFromInvalid) {
            return 'Data final menor que data inicial';
        }
        if (control.errors.dateToInvalid) {
            return 'Data inicial maior que data final';
        }
        if (control.errors.birthDayInvalid) {
            return 'Deve ser maior que 18 anos';
        }
        if (control.errors.dateAboveCurrentDateInvalid) {
            return 'Data superior a atual';
        }
        if (control.errors.dateCreditCardInvalid) {
            return 'Cartão vencido';
        }
        if (control.errors.dateBelowCurrentDateInvalid && control.errors.dateBelowCurrentDateInvalid.error) {
            if (control.errors.dateBelowCurrentDateInvalid.customMessage) {
                return control.errors.dateBelowCurrentDateInvalid.customMessage;
            }
            return 'Data inferior a atual';
        }
        if (control.errors.invalidDate) {
            return 'Data inválida';
        }
        if (control.errors.lowerLetterPassoword) {
            return 'Precisa de uma letra minúscula';
        }
        if (control.errors.minlengthPassword) {
            return 'No mínimo 8 caracteres';
        }
        if (control.errors.upperLetterPassoword) {
            return 'Precisa de uma letra maiúscula';
        }
        if (control.errors.numberPassword) {
            return 'Precisa de um número';
        }
    }
    return '';
}