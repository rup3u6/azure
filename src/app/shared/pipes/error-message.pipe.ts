import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null, ...args: unknown[]): string {
    // console.log(errors);
    if (errors) {
      const errorType: string = Object.keys(errors)[0];
      switch (errorType) {
        case 'required':
          return '此欄位必填';
        case 'minlength':
          return 'VIEW.ERROR';
        default:
          return '未知的錯誤';
      }
    }
    return '';
  }
}
