import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataExchangeService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
