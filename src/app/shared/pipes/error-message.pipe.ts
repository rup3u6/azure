import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {

  constructor(
    private translatePipe: TranslatePipe
  ) { }

  transform(errors: ValidationErrors | null | undefined, name: string, ...args: unknown[]): string {
    let error = '';
    let length = '';
    for (const key in errors) {
      switch (key) {
        case 'required': error = 'ERRORS.REQUIRED'; break;
        case 'greaterThanEndDate': error = 'ERRORS.GREATER_THAN_END_DATE'; break;
        case 'minlength': 
          error = 'ERRORS.MIN_LENGTH';
          length = errors['minlength']['requiredLength'];
          break;
        default: error = 'ERRORS.UNKNOWN_ERROR'; break;
      }
    }

    return this.translatePipe.transform(error, { length });
  }
}
