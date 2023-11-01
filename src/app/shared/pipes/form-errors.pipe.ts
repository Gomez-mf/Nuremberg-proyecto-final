import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formErrors',
})
export class FormErrorsPipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): unknown {

    const errorMessages: String[] = [];
    if (!value) {
      return '';
    }
    if (value) {
      if ('required' in value) {
        errorMessages.push('Este campo es requerido');
      }

      if ('email' in value) {
        errorMessages.push('Debe ingresar un email válido');
      }

      if ('minLength') {
        errorMessages.push('Debe ingresar al menos 3 carácteres');
      }
    }

    return errorMessages.join('. ');
  }
}
