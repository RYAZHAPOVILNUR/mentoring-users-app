import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, startWith, switchMap } from 'rxjs';
import { IUserTimer } from './user-timer.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserTimerService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly timer$ = new BehaviorSubject<number>(this.loadTimerToLocalStorage());
  private readonly isRunning$ = new BehaviorSubject<boolean>(false);
  private readonly timerState$ = this.isRunning$.pipe(
    switchMap((isRunning) => (isRunning ? interval(1000).pipe(startWith(0), takeUntilDestroyed(this.destroyRef)) : [])),
    map(() => this.timer$.value + 1)
  );

  constructor() {
    this.timerState$.subscribe((seconds) => this.timer$.next(seconds));
  }

  startTimer() {
    if (!this.isRunning$.value) {
      this.isRunning$.next(true);
    }
  }

  stopTimer() {
    this.isRunning$.next(false);
    this.saveTimerToLocalStorage(this.timer$.value);
  }

  resetTimer() {
    this.stopTimer();
    this.timer$.next(0);
    this.saveTimerToLocalStorage(0);
  }

  getTimer() {
    return this.timer$.pipe(
      map((totalSeconds: number): IUserTimer => {
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
      })
    );
  }

  private saveTimerToLocalStorage(value: number) {
    localStorage.setItem('user-timer', value.toString());
  }

  private loadTimerToLocalStorage() {
    const storedTimer = localStorage.getItem('user-timer');
    return storedTimer ? +storedTimer : 0;
  }
}
