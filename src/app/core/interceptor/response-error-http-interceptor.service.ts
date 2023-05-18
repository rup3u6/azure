import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponseErrorHttpInterceptorService implements HttpInterceptor {
  constructor() {}
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const { status: httpStatus, error: response } = error;
        const { status, message } = response;
        // console.log(request)
        // console.log(error)
        console.log(`httpStatus: ${httpStatus}, status: ${status}`);
        console.log(`response: ${JSON.stringify(response)}`);
        if (status) {
          if (status !== '999') {
            alert(message);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
