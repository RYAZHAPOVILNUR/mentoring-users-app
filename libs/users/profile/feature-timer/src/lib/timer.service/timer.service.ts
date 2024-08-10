import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer$ = timer(0, 1000);
  private stopTimer$ = new Subject<void>();
  private readonly timerSubject$ = new BehaviorSubject<Timer>(this.getTimerFromLocalStorage());
  public timerData$ = this.timerSubject$.asObservable();

  public startTimer(): void {
    this.timer$
      .pipe(
        takeUntil(this.stopTimer$),
        withLatestFrom(this.timerSubject$),
        tap(([, timer]) => {
          if (timer.seconds >= 59) {
            timer.minutes++;
            timer.seconds = 0;
          }
          if (timer.minutes >= 59) {
            timer.hours++;
            timer.minutes = 0;
          }
          if (timer.hours >= 24) {
            timer.days++;
            timer.hours = 0;
          }
          timer.seconds++;

          this.setTimerToLocalStorage();
          this.timerSubject$.next(timer);
        })
      )
      .subscribe();
  }

  public stopTimer(): void {
    this.stopTimer$.next();
  }

  private setTimerToLocalStorage(): void {
    const data = this.timerSubject$.getValue();
    localStorage.setItem('Timer', JSON.stringify(data));
  }

  private getTimerFromLocalStorage(): Timer {
    const data = localStorage.getItem('Timer');
    return data ? JSON.parse(data) : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
}
