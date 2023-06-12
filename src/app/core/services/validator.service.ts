import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  dateRangeValidator(start: any, end: any) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startDateControl = formGroup.get(start)!;
      const endDateControl = formGroup.get(end)!;

      if (startDateControl.value > endDateControl.value) {
        let errors = endDateControl.errors;
        startDateControl.setErrors({
          ...errors,
          greaterThanEndDate: true
        });
      }

      return null;
    }
  }
}
