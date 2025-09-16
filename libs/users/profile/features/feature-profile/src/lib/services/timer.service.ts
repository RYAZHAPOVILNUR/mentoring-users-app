import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';

export interface timerValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly stop$: Subject<void> = new Subject();
  private toggleTimerBtn = false;
  private timerSubject$: BehaviorSubject<timerValue> = new BehaviorSubject<timerValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  public readonly timer$: Observable<number> = timer(0, 1000).pipe(takeUntil(this.stop$));

  public getTimer(): Observable<timerValue> {
    return this.timerSubject$;
  }

  public startTimer(): void {
    this.timer$.subscribe(() => {
      let { days, hours, minutes, seconds } = this.timerSubject$.value;

      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      if (hours === 24) {
        hours = 0;
        days++;
      }
      this.timerSubject$.next({ days, hours, minutes, seconds });
    });
  }

  public stopTimer(): void {
    this.stop$.next();
  }

  public toggleTimer(): void {
    if (!this.toggleTimerBtn) {
      this.toggleTimerBtn = true;
      this.startTimer();
    } else {
      this.toggleTimerBtn = false;
      this.stopTimer();
    }
  }

  public restartTimer(): void {
    this.timerSubject$.next({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    this.toggleTimerBtn = false;
    this.stop$.next();
  }

  public setToLocalStorage(): void {
    localStorage.setItem('days', this.timerSubject$.value.days.toString());
    localStorage.setItem('hours', this.timerSubject$.value.hours.toString());
    localStorage.setItem('minutes', this.timerSubject$.value.minutes.toString());
    localStorage.setItem('seconds', this.timerSubject$.value.seconds.toString());
  }

  public getFromLocalStorage(): void {
    const days = Number(localStorage.getItem('days')) || 0;
    const hours = Number(localStorage.getItem('hours')) || 0;
    const minutes = Number(localStorage.getItem('minutes')) || 0;
    const seconds = Number(localStorage.getItem('seconds')) || 0;
    this.timerSubject$.next({ days, hours, minutes, seconds });
  }
}
