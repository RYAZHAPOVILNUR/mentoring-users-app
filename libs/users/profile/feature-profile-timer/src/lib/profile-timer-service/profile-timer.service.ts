import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';

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
      this.start();
    }
  }

  public start() {
    this.isRunningSubject$.next(true);
    this.interval$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.seconds += 1;
      this.secondsSubject$.next(this.seconds);
      this.updateLocalStorage(this.seconds, true);
    });
  }

  public pause() {
    this.isRunningSubject$.next(false);
    this.destroy$.next(true);
    this.updateLocalStorage(this.seconds, false);
  }

  public reset() {
    this.isRunningSubject$.next(false);
    this.destroy$.next(true);
    this.seconds = 0;
    this.isRunning = false;
    this.secondsSubject$.next(this.seconds);
    this.updateLocalStorage(this.seconds, false);
  }

  private getSecondsFromLocalStorage() {
    const data = localStorage.getItem('timer');
    if (data) {
      return JSON.parse(data).seconds;
    } else return 0;
  }

  private getIsRunningFromLocalStorage() {
    const data = localStorage.getItem('timer');
    if (data) {
      return JSON.parse(data).isRunning;
    } else return false;
  }

  private updateLocalStorage(seconds: number, isRunning: boolean) {
    const timerTimeObjectJSON = JSON.stringify({ seconds, isRunning });
    localStorage.setItem('timer', timerTimeObjectJSON);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
