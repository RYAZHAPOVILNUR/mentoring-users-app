import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';

export type TimerTime = {
  hours: number;
  minutes: number;
  seconds: number;
};
@Injectable({
  providedIn: 'root',
})
export class ProfileTimerService {
  private seconds = 0;
  private initialTimerTime = 0;

  private destroy$ = new Subject<boolean>();
  private interval$ = interval(1000);

  private isTimerRunningSubject$ = new BehaviorSubject<boolean>(false);
  public isTimerRunning$ = this.isTimerRunningSubject$.asObservable();

  private timerTimeSubject$ = new BehaviorSubject<number>(this.initialTimerTime);
  public timerTime$ = this.timerTimeSubject$.asObservable();

  private startTimer() {
    this.interval$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.seconds += 1;
      this.timerTimeSubject$.next(this.seconds);
      this.setTimerStateToLocalStorage(true);
    });
  }

  private stopTimer() {
    this.isTimerRunningSubject$.next(false);
    this.destroy$.next(true);
  }

  public start() {
    this.isTimerRunningSubject$.next(true);
    this.startTimer();
  }

  public pause() {
    this.isTimerRunningSubject$.next(false);
    this.stopTimer();
    this.setTimerStateToLocalStorage(false);
  }

  secondsToTimeString(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds - hours * 3600 - minutes * 60;

    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;
    return `${h}:${m}:${s}`;
  }

  private setTimerStateToLocalStorage(state: boolean) {
    const timerState = {
      timeInSeconds: this.seconds,
      state: state,
    };
    const timerTimeObjectJSON = JSON.stringify(timerState);
    localStorage.setItem('timer', timerTimeObjectJSON);
  }
}
