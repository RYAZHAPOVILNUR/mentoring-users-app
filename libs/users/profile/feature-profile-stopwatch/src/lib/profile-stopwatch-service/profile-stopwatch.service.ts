import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type StopwatchTime = {
  hours: number;
  minutes: number;
  seconds: number;
};
@Injectable({
  providedIn: 'root',
})
export class ProfileStopwatchService {
  private hours = 0;
  private minutes = 0;
  private seconds = 0;
  private initialStopwatchTime = this.getTimeFromLocalStorage();

  private isStopwatchRunningSubject$ = new BehaviorSubject<boolean>(false);
  public isStopwatchRunning$ = this.isStopwatchRunningSubject$.asObservable()

  private stopwatchTimeSubject$ = new BehaviorSubject<string>(this.initialStopwatchTime);
  public stopwatchTime$ = this.stopwatchTimeSubject$.asObservable();

  private setIntervalID: number | undefined = undefined;

  constructor() {
    this.isStopwatchRunning$.subscribe((isStopwatchRunning) => {
      if (isStopwatchRunning) {
        if (this.setIntervalID !== undefined) {
          clearInterval(this.setIntervalID);
        }
        this.setIntervalID = setInterval(() => this.startCountdown(), 1000);
      } else {
        clearInterval(this.setIntervalID);
      }
    });
  }

  public startStopwatch() {
    this.isStopwatchRunningSubject$.next(true);
  }

  public pauseStopwatch() {
    this.isStopwatchRunningSubject$.next(false);
  }

  private getTimeFromLocalStorage(): string {
    const data = localStorage.getItem('stopwatch');
    if (data) {
      let timeInLocalStorage = JSON.parse(data);
      this.hours = timeInLocalStorage.hours;
      this.minutes = timeInLocalStorage.minutes;
      this.seconds = timeInLocalStorage.seconds;
      return this.getActualTimeString();
    } else {
      console.log('work else');
      return '00:00:00';
    }
  }

  private setTimeToLocalStorage() {
    const stopwatchTimeObject = {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
    const stopwatchTimeObjectJSON = JSON.stringify(stopwatchTimeObject);
    localStorage.setItem('stopwatch', stopwatchTimeObjectJSON);
  }

  private startCountdown() {
    this.seconds += 1;

    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;

      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    this.stopwatchTimeSubject$.next(this.getActualTimeString());
    this.setTimeToLocalStorage();
  }

  private getActualTimeString() {
    const h = this.hours < 10 ? '0' + this.hours : this.hours;
    const m = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    const s = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    return `${h}:${m}:${s}`;
  }
}
