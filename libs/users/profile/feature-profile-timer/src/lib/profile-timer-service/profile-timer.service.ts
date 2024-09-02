// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// export type TimerTime = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };
// @Injectable({
//   providedIn: 'root',
// })
// export class ProfileTimerService {
//   private hours = 0;
//   private minutes = 0;
//   private seconds = 0;
//   private initialTimerTime = this.getTimeFromLocalStorage();

//   private isTimerRunningSubject$ = new BehaviorSubject<boolean>(false);
//   public isTimerRunning$ = this.isTimerRunningSubject$.asObservable();

//   private timerTimeSubject$ = new BehaviorSubject<string>(this.initialTimerTime);
//   public timerTime$ = this.timerTimeSubject$.asObservable();

//   private setIntervalID: number | undefined = undefined;

//   constructor() {
//     this.isTimerRunning$.pipe(takeUntilDestroyed()).subscribe((isTimerRunning) => {
//       if (isTimerRunning) {
//         if (this.setIntervalID !== undefined) {
//           clearInterval(this.setIntervalID);
//         }
//         this.setIntervalID = setInterval(() => this.startCountdown(), 1000);
//       } else {
//         clearInterval(this.setIntervalID);
//       }
//     });
//   }

//   public start() {
//     this.isTimerRunningSubject$.next(true);
//   }

//   public pause() {
//     this.isTimerRunningSubject$.next(false);
//   }

//   private getTimeFromLocalStorage(): string {
//     const data = localStorage.getItem('timer');
//     if (data) {
//       let timeInLocalStorage = JSON.parse(data);
//       this.hours = timeInLocalStorage.hours;
//       this.minutes = timeInLocalStorage.minutes;
//       this.seconds = timeInLocalStorage.seconds;
//       return this.getActualTimeString();
//     } else {
//       console.log('work else');
//       return '00:00:00';
//     }
//   }

//   private setTimeToLocalStorage() {
//     const timerTimeObject = {
//       hours: this.hours,
//       minutes: this.minutes,
//       seconds: this.seconds,
//     };
//     const timerTimeObjectJSON = JSON.stringify(timerTimeObject);
//     localStorage.setItem('timer', timerTimeObjectJSON);
//   }

//   private startCountdown() {
//     this.seconds += 1;

//     if (this.seconds === 60) {
//       this.seconds = 0;
//       this.minutes++;

//       if (this.minutes === 60) {
//         this.minutes = 0;
//         this.hours++;
//       }
//     }
//     this.timerTimeSubject$.next(this.getActualTimeString());
//     this.setTimeToLocalStorage();
//   }

//   private getActualTimeString() {
//     const h = this.hours < 10 ? '0' + this.hours : this.hours;
//     const m = this.minutes < 10 ? '0' + this.minutes : this.minutes;
//     const s = this.seconds < 10 ? '0' + this.seconds : this.seconds;
//     return `${h}:${m}:${s}`;
//   }

//   private getActualTimeStringPure(hours: number, minutes: number, seconds: number) {
//     const h = hours < 10 ? '0' + hours : hours;
//     const m = minutes < 10 ? '0' + minutes : minutes;
//     const s = seconds < 10 ? '0' + seconds : seconds;
//     return `${h}:${m}:${s}`;
//   }
// }

// ============================================================================================
// ============================================================================================
// ============================================================================================
// ============================================================================================
// ============================================================================================

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TimerTime = {
  hours: number;
  minutes: number;
  seconds: number;
};
@Injectable({
  providedIn: 'root',
})
export class ProfileTimerService {
  private hours = 0;
  private minutes = 0;
  private seconds = 0;
  private initialTimerTime = this.getTimeFromLocalStorage();

  private isTimerRunningSubject$ = new BehaviorSubject<boolean>(false);
  public isTimerRunning$ = this.isTimerRunningSubject$.asObservable();

  private timerTimeSubject$ = new BehaviorSubject<string>(this.initialTimerTime);
  public timerTime$ = this.timerTimeSubject$.asObservable();

  private setIntervalID: number | undefined = undefined;

  private startTimer() {
    if (this.setIntervalID !== undefined) {
      clearInterval(this.setIntervalID);
    }
    this.setIntervalID = setInterval(() => this.startCountdown(), 1000);
  }

  private stopTimer() {
    clearInterval(this.setIntervalID)
  }

  public start() {
    this.isTimerRunningSubject$.next(true);
    this.startTimer()
  }

  public pause() {
    this.isTimerRunningSubject$.next(false);
    this.stopTimer()
  }

  private getTimeFromLocalStorage(): string {
    const data = localStorage.getItem('timer');
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
    const timerTimeObject = {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
    const timerTimeObjectJSON = JSON.stringify(timerTimeObject);
    localStorage.setItem('timer', timerTimeObjectJSON);
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
    this.timerTimeSubject$.next(this.getActualTimeString());
    this.setTimeToLocalStorage();
  }

  private getActualTimeString() {
    const h = this.hours < 10 ? '0' + this.hours : this.hours;
    const m = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    const s = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    return `${h}:${m}:${s}`;
  }

  private getActualTimeStringPure(hours: number, minutes: number, seconds: number) {
    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;
    return `${h}:${m}:${s}`;
  }
}
