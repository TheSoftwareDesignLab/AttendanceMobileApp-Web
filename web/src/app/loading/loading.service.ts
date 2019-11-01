import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: BehaviorSubject<boolean>;

  constructor() {
    this.loading = new BehaviorSubject(false);
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  startLoading() {
    this.loading.next(true);
  }

  stopLoading() {
    this.loading.next(false);
  }
}
