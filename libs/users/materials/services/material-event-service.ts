import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialEventService<T> {
  private readonly actionSubject$$ = new Subject<T>();

  public updateAction(data: T) {
    this.actionSubject$$.next(data);
  }

  public getAction$(): Observable<T> {
    return this.actionSubject$$.asObservable();
  }
}
