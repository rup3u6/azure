import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  post<T>(path: string, body: any = null): Observable<T> {
    const fullPath = `${this.apiUrl}/${path}`;

    return this.http.post<T>(fullPath, body).pipe(map((res: any) => JSON.parse(res)));
  }

  post_blob(path: string, body: any = null): Observable<Blob> {
    const fullPath = `${this.apiUrl}/${path}`;

    return this.http.post<Blob>(fullPath, body, { responseType: 'blob' as 'json', });
  }
}
