import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileStopwatchService {
  // private hours = 0;
  // private minutes = 0;

  timeInLocalStorage = Number(this.getTimeFromLocalStorage())

  private seconds = this.timeInLocalStorage || 0;

  public isWorking = new BehaviorSubject<boolean>(false);

  private timeInSecondsSubject$ = new BehaviorSubject<number>(this.seconds)
  public timeInSeconds$ = this.timeInSecondsSubject$.asObservable()

  private stopwatchID: number | undefined = undefined;

  constructor() {
    this.isWorking.subscribe((isWorking) => {
      if (isWorking) {
        console.log('isWorking = true');
        if (this.stopwatchID !== undefined) {
          clearInterval(this.stopwatchID);
        }
        this.stopwatchID = setInterval(() => this.startCountdownSecondsOnly(), 1000);
        // this.stopwatchID = setInterval(() => this.startCountdown(), 1000)
      } else {
        console.log('isWorking = false');
        clearInterval(this.stopwatchID);
      }
    });
  }

  startCountdownSecondsOnly() {
    this.seconds += 1;
    this.timeInSecondsSubject$.next(this.seconds)
    this.setTimeToLocalStorage(this.seconds)
  }

  playStopwatch() {
    this.isWorking.next(true);
  }

  pauseStopwatch() {
    this.isWorking.next(false);
  }

  logTimeString() {
    let date = new Date(0);
    date.setSeconds(this.seconds); // specify value for SECONDS here
    let timeString = date.toISOString().substring(11, 19);
    console.log(timeString);
  }

  getTimeFromLocalStorage(): string | null {
    return localStorage.getItem('stopwatch') || null;
  }

  setTimeToLocalStorage(time: number) {
    localStorage.setItem('stopwatch', time.toString());
  }

  //   startCountdown() {
  //   this.seconds += 1;

  //   if (this.seconds === 10) {
  //     this.seconds = 0;
  //     this.minutes++;

  //     if (this.minutes === 10) {
  //       this.minutes = 0;
  //       this.hours++;
  //     }
  //   }
  //   console.log(this.hours, this.minutes, this.seconds);
  // }
}
