import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }

  getFormErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Este campo es requerido, por favor ingresa un valor';
    } else if (control.hasError('min')) {
      const minError = control.errors.min;
      return `El valor mínimo posible es ${minError.min}`;
    } else if (control.hasError('max')) {
      const maxError = control.errors.max;
      return `El valor máximo posible es ${maxError.max}`;
    } else if (control.hasError('email')) {
      return 'Debes ingresar un correo electrónico';
    } else if (control.hasError('minlength')) {
      const minLengthError = control.errors.minlength;
      return `Debes ingresar al menos ${minLengthError.requiredLength} caracteres`;
    } else {
      return '';
    }
  }
}
