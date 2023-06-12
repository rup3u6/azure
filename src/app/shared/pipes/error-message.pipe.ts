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

    for (const key in errors) {
      switch (key) {
        case 'required': error = '此欄位必填'; break;
        case 'greaterThanEndDate': error = '起日大於迄日'; break;
        case 'minlength': error = 'VIEW.ERROR'; break;
        default: error = '未知的錯誤'; break;
      }
    }

    return this.translatePipe.transform(error);
  }
}
