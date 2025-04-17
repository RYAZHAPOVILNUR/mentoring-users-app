import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, timer, BehaviorSubject, Subject, takeUntil } from 'rxjs';

interface TimerState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timersSubjects: Map<number, BehaviorSubject<TimerState>> = new Map();
  private destroySubjects: Map<number, Subject<void>> = new Map();
  private readonly STORAGE_PREFIX = 'user_timer_';
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.restoreTimers();
  }

  private restoreTimers(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.STORAGE_PREFIX))
      .forEach(key => {
        const userId = parseInt(key.replace(this.STORAGE_PREFIX, ''));
        const isRunning = localStorage.getItem(`${this.STORAGE_PREFIX}${userId}_running`);

        if (isRunning === 'true') {
          this.createTimer(userId);
          this.startTimer(userId);
        }
      });
  }

  createTimer(userId: number): void {
    if (this.timersSubjects.has(userId)) {
      return;
    }

    const savedState = this.getTimerStateFromStorage(userId);

    this.timersSubjects.set(userId, new BehaviorSubject<TimerState>(savedState));
    this.destroySubjects.set(userId, new Subject<void>());
  }

  getTimer(userId: number): Observable<TimerState> {
    if (!this.timersSubjects.has(userId)) {
      this.createTimer(userId);
    }

    return this.timersSubjects.get(userId)!.asObservable();
  }

  startTimer(userId: number): void {
    if (!this.timersSubjects.has(userId)) {
      this.createTimer(userId);
    }

    if (this.destroySubjects.has(userId)) {
      this.destroySubjects.get(userId)!.next();
      this.destroySubjects.set(userId, new Subject<void>());
    }

    localStorage.setItem(`${this.STORAGE_PREFIX}${userId}_running`, 'true');

    const currentState = this.timersSubjects.get(userId)!.getValue();
    let { days, hours, minutes, seconds } = currentState;

    timer(0, 1000)
      .pipe(
        takeUntil(this.destroySubjects.get(userId)!),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }

        if (minutes === 60) {
          minutes = 0;
          hours++;
        }

        if (hours === 24) {
          hours = 0;
          days++;
        }

        const newState = { days, hours, minutes, seconds };
        this.timersSubjects.get(userId)!.next(newState);
        this.saveTimerStateToStorage(userId, newState);
      });
  }

  stopTimer(userId: number): void {
    if (this.destroySubjects.has(userId)) {
      this.destroySubjects.get(userId)!.next();

      localStorage.removeItem(`${this.STORAGE_PREFIX}${userId}_running`);
    }
  }

  resetTimer(userId: number): void {
    this.stopTimer(userId);

    if (this.timersSubjects.has(userId)) {
      const resetState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.timersSubjects.get(userId)!.next(resetState);
      this.saveTimerStateToStorage(userId, resetState);
      localStorage.removeItem(`${this.STORAGE_PREFIX}${userId}_running`);
    }
  }

  private saveTimerStateToStorage(userId: number, state: TimerState): void {
    const storageKey = `${this.STORAGE_PREFIX}${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  private getTimerStateFromStorage(userId: number): TimerState {
    const storageKey = `${this.STORAGE_PREFIX}${userId}`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        return JSON.parse(savedData) as TimerState;
      } catch (e) {
        console.error('Ошибка при чтении данных таймера из localStorage', e);
      }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
