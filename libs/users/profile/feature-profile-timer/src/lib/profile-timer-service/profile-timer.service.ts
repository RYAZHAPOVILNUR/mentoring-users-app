import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';

export type TimerTime = {
  hours: number;
  minutes: number;
  seconds: number;
};
@Injectable({
  providedIn: 'root',
})
export class ProfileTimerService implements OnDestroy {
  private seconds = this.getSecondsFromLocalStorage();
  private isRunning = this.getIsRunningFromLocalStorage();

  private destroy$ = new Subject<boolean>();
  private interval$ = interval(1000);

  private isRunningSubject$ = new BehaviorSubject<boolean>(this.isRunning);
  public isRunning$ = this.isRunningSubject$.asObservable();

  private secondsSubject$ = new BehaviorSubject<number>(this.seconds);
  public seconds$ = this.secondsSubject$.asObservable();

  constructor() {
    if (this.isRunning) {
      this.startCountdown()
    }
  }

  public start() {
    this.isRunningSubject$.next(true);
    this.startCountdown();
  }

  public pause() {
    this.isRunningSubject$.next(false);
    this.stopCountdown();
  }

  private startCountdown() {
    this.interval$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.seconds += 1;
      console.log('this.seconds in startCountdown', this.seconds);

      this.secondsSubject$.next(this.seconds);
      this.setTimerStateToLocalStorage(this.seconds, true);
    });
  }

  private stopCountdown() {
    this.destroy$.next(true);
    this.setTimerStateToLocalStorage(this.seconds, false);
  }

  private getSecondsFromLocalStorage() {
    const data = localStorage.getItem('timer');
    if (data) {
      return JSON.parse(data).valueInSeconds;
    } else return 0;
  }

  private getIsRunningFromLocalStorage() {
    const data = localStorage.getItem('timer');
    if (data) {
      return JSON.parse(data).isRunning;
    } else return false;
  }

  private setTimerStateToLocalStorage(valueInSeconds: number, isRunning: boolean) {
    const timerTimeObjectJSON = JSON.stringify({ valueInSeconds, isRunning });
    localStorage.setItem('timer', timerTimeObjectJSON);
  }

  ngOnDestroy() {
    // this.destroy$.next(true)
  }
}
