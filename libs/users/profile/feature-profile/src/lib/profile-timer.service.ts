import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy {
  private timerStop$ = new Subject<void>();
  public timerCount$ = new BehaviorSubject<string>(this.getInitialTime());
  private counter = 0;
  public isToggled = false;

  public startTimer(): void {
    this.isToggled = true;
    timer(0, 1000)
      .pipe(takeUntil(this.timerStop$))
      .subscribe(() => {
        this.counter = this.getTimeFromLocalStorage();
        this.counter++;
        this.timerCount$.next(this.formatTime(this.counter));
        this.setTimeToLocalStorage(this.counter);
      });
  }

  public pauseTimer(): void {
    this.isToggled = false;
    this.timerStop$.next();
  }

  public stopTimer(): void {
    this.counter = 0;
    this.timerCount$.next(this.formatTime(this.counter));
    this.timerStop$.next();
    this.removeTimeFromLocalStorage();
  }

  private getTimeFromLocalStorage(): number {
    return Number(localStorage.getItem('timer'));
  }

  private setTimeToLocalStorage(time: number): void {
    localStorage.setItem('timer', time.toString());
  }

  private removeTimeFromLocalStorage(): void {
    localStorage.removeItem('timer');
  }

  private getInitialTime(): string {
    const savedTime = this.getTimeFromLocalStorage();
    if (savedTime) {
      return this.formatTime(savedTime);
    } else {
      return '0д 0ч 00:00';
    }
  }

  private formatTime(seconds: number): string {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}д ${hours}ч ${this.setPad(minutes)}:${this.setPad(secs)}`;
  }

  private setPad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy(): void {
    this.timerStop$.complete();
    this.timerCount$.complete();
  }
}
