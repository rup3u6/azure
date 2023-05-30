import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public async startLoading(): Promise<void> {
    await this._isLoading$.next(true);
  }

  public async stopLoading(): Promise<void> {
    await this._isLoading$.next(false);
  }

  public toggleLoading(): void {
    let toggle = !this._isLoading$.getValue();
    this._isLoading$.next(toggle);
  }
}
