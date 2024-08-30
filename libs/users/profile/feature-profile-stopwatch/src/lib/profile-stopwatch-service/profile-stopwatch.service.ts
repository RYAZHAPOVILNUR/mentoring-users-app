import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type StopwatchTime = {
  hours: number,
  minutes: number,
  seconds: number,
}
@Injectable({
  providedIn: 'root',
})
export class ProfileStopwatchService {
  initialStopwatchTime = this.getTimeFromLocalStorage()
  private hours = 0;
  private minutes = 0;
  private seconds = 0;
  public isStopwatchRunning = new BehaviorSubject<boolean>(false);
  private stopwatchTimeSubject$ = new BehaviorSubject<string>(this.initialStopwatchTime);
  public stopwatchTime$ = this.stopwatchTimeSubject$.asObservable();
  private setIntervalID: number | undefined = undefined;

  constructor() {

    this.isStopwatchRunning.subscribe((isStopwatchRunning) => {
      if (isStopwatchRunning) {
        console.log('isWorking = true');
        if (this.setIntervalID !== undefined) {
          clearInterval(this.setIntervalID);
        }
        this.setIntervalID = setInterval(() => this.startCountdown(), 1000)
      } else {
        console.log('isWorking = false');
        clearInterval(this.setIntervalID);
      }
    });
  }

  playStopwatch() {
    this.isStopwatchRunning.next(true);
  }

  pauseStopwatch() {
    this.isStopwatchRunning.next(false);
  }

  getTimeFromLocalStorage(): string {
    const data =  localStorage.getItem('stopwatch');
    if(data) {
      let timeInLocalStorage = JSON.parse(data);
      this.hours = timeInLocalStorage.hours;
      this.minutes = timeInLocalStorage.minutes;
      this.seconds = timeInLocalStorage.seconds;
      return this.getActualTimeString()
    } else return '00:00:00'
  }

  setTimeToLocalStorage() {
    const stopwatchTimeObject = {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds
    }
    const stopwatchTimeObjectJSON = JSON.stringify(stopwatchTimeObject)
    localStorage.setItem('stopwatch', stopwatchTimeObjectJSON);
  }

  startCountdown() {
    this.seconds += 1;

    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;

      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
    }

    this.stopwatchTimeSubject$.next(this.getActualTimeString())

    this.setTimeToLocalStorage()
  }

  getActualTimeString() {
    const h = this.hours < 10 ? '0' + this.hours : this.hours
    const m = this.minutes < 10 ? '0' + this.minutes : this.minutes
    const s = this.seconds < 10 ? '0' + this.seconds : this.seconds
    return `${h}:${m}:${s}`
  }
}

  // startCountdownSecondsOnly() {
  //   this.seconds += 1;
  //   this.timeInSecondsSubject$.next(this.seconds);
  //   this.setTimeToLocalStorage(this.seconds);
  // }

    // logTimeString() {
  //   let date = new Date(0);
  //   date.setSeconds(this.seconds); // specify value for SECONDS here
  //   let timeString = date.toISOString().substring(11, 19);
  //   console.log(timeString);
  // }
