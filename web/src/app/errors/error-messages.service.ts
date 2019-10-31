import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }

  getFormErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required, please write a value';
    } else if (control.hasError('minlength')) {
      const minError = control.errors.minlength;
      console.log(minError)
      return `The minimum lenght of this field is ${minError.requiredLength}`;
    } else if (control.hasError('maxlength')) {
      const maxError = control.errors.maxlength;
      return `The maximum lenght of this field is ${maxError.requiredLength}`;
    } else {
      return '';
    }
  }
}
