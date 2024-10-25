import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StickyButtonService implements OnDestroy {
  private isStickySubject = new BehaviorSubject<boolean>(false); // Текущее состояние "липкости"
  private scrollSubscription: Subscription;

  constructor() {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        map(() => this.isButtonSticky()),
        startWith(this.isButtonSticky())
      )
      .subscribe(this.isStickySubject);
  }

  private isButtonSticky(): boolean {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return scrollTop > -1;
  }

  public get isSticky$() {
    return this.isStickySubject.asObservable();
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}
