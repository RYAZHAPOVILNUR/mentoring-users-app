import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProvideDataService {
  private readonly dateSubject$ = new BehaviorSubject<any>('initial date');
  public readonly date$ = this.dateSubject$.asObservable();

  public updateDate<T>(date: T): void {
    this.dateSubject$.next(date);
  }
}
