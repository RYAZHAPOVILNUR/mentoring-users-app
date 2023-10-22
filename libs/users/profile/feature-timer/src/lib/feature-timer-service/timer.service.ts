import { Injectable } from '@angular/core';
import { Observable, timer, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  destroy$: Subject<void> = new Subject();
  private timer$: Observable<number> = timer(0, 1000).pipe(takeUntil(this.destroy$));
  public timerSubject$: BehaviorSubject<{ days: number, hours: number, minutes: number, seconds: number }> = new BehaviorSubject({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  constructor() {
    this.toggleBtnTimer = false;
    this.saveToggleToLocalStorage();
    this.getItemFromLocalStorage();
  }

  private toggleBtnTimer = false;
  private saveToggleToLocalStorage() {
    localStorage.setItem('toggleBtnTimer', this.toggleBtnTimer.toString());
  }
  getToggleValue(): boolean {
    return this.toggleBtnTimer;
  }
  toggleTimer() {
    this.toggleBtnTimer = !this.toggleBtnTimer;
    this.saveToggleToLocalStorage();
  }
  
  private saveToLocalStorage() {
    localStorage.setItem('days', this.days.toString());
    localStorage.setItem('hours', this.hours.toString());
    localStorage.setItem('minutes', this.minutes.toString());
    localStorage.setItem('seconds', this.seconds.toString());
  }

  private parseFromLocalStorage(key: string): number {
    const storedValue = localStorage.getItem(key);
    return storedValue ? parseInt(storedValue, 10) : 0;
  }
  public getItemFromLocalStorage() {
    this.days = this.parseFromLocalStorage('days');
    this.hours = this.parseFromLocalStorage('hours');
    this.minutes = this.parseFromLocalStorage('minutes');
    this.seconds = this.parseFromLocalStorage('seconds');
  }

  public getTimerValue(): Observable<{ days: number, hours: number, minutes: string, seconds: string }> {
    return this.timerSubject$.pipe(
      map(({ days, hours, minutes, seconds }) => ({
        days,
        hours,
        minutes: this.formatTime(minutes),
        seconds: this.formatTime(seconds),
      }))
    );
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  startTimer() {
    this.timer$.subscribe(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours === 24) {
        this.hours = 0;
        this.days++;
      }
      this.saveToLocalStorage();
      this.timerSubject$.next({ days: this.days, hours: this.hours, minutes: this.minutes, seconds: this.seconds });
      })

    this.getItemFromLocalStorage();
    }

  pauseTimer() {
    this.destroy$.next();
  }

  resetTimer() {
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.saveToLocalStorage();
  }
}
