import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Subscription, timer } from "rxjs";

export interface Timer {
  sec: string;
  min: string;
  hours: string;
  days: string;
}

@Injectable({ providedIn: 'root' })
export class TimerService {
  private readonly initialTime = this.getInitialTime();
  private time$ = new BehaviorSubject<number>(this.initialTime);
  private lastStopedTime = this.initialTime;
  private timerSubscription = new Subscription();
  public isRunning = false;

  public get timer$() {
    return this.time$.pipe(
      map((val: number): Timer => this.transformSeconds(val))
    );
  }


  public startTimer(): void {
    if (this.isRunning) {
      return
    }
    this.timerSubscription = timer(this.initialTime, 1000)
      .pipe(map((value: number) => value + this.lastStopedTime))
      .subscribe((val) => {
        this.time$.next(val)
        this.setTimeToLocalStorage(val)
    })
    this.isRunning = true;
  }

  public stopTimer(): void {
    this.lastStopedTime = this.time$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }
  
  public resetTimer(): void {
    this.timerSubscription.unsubscribe();
    this.lastStopedTime = 0;
    this.time$.next(0);
    this.removeTimeFromLocalStorage();
    this.isRunning = false;
  }

  private transformSeconds(time: number): Timer {
    const sec = time % 60;
    const min = Math.floor((time / 60) % 60);
    const hours = Math.floor((time / 3600) % 24);
    const days = Math.floor(time / (3600 * 24))

    return {
      sec: this.addTrailingZeros(sec),
      min: this.addTrailingZeros(min),
      hours: String(hours),
      days: String(days),
    }
  }

  private addTrailingZeros(val: number): string {
    return `${val < 10 ? '0' + val : val}`
  }

  private getTimeFromLocalStorage(): number {
    return Number(localStorage.getItem('timer'));
  }

  private setTimeToLocalStorage(time: number): void {
    localStorage.setItem('timer', String(time));
  }

  private removeTimeFromLocalStorage(): void {
    localStorage.removeItem('timer');
  }

  private getInitialTime() {
    const savedTime = this.getTimeFromLocalStorage();
    if (savedTime) {
      return savedTime
    } else {
      return 0
    }
  }
}