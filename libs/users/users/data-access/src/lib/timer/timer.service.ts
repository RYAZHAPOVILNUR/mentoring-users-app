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
    // Добавляем восстановление таймеров при создании сервиса
    this.restoreTimers();
  }

  private restoreTimers(): void {
    // Поиск всех активных таймеров в localStorage
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

  /**
   * Создает таймер для указанного идентификатора пользователя
   */
  createTimer(userId: number): void {
    if (this.timersSubjects.has(userId)) {
      return;
    }

    // Загрузка данных из localStorage, если они есть
    const savedState = this.getTimerStateFromStorage(userId);

    // Создание нового таймера
    this.timersSubjects.set(userId, new BehaviorSubject<TimerState>(savedState));
    this.destroySubjects.set(userId, new Subject<void>());
  }

  /**
   * Получает Observable для таймера конкретного пользователя
   */
  getTimer(userId: number): Observable<TimerState> {
    if (!this.timersSubjects.has(userId)) {
      this.createTimer(userId);
    }

    return this.timersSubjects.get(userId)!.asObservable();
  }

  /**
   * Запускает таймер для указанного пользователя
   */
  startTimer(userId: number): void {
    if (!this.timersSubjects.has(userId)) {
      this.createTimer(userId);
    }

    // Если у пользователя уже был таймер, отменяем предыдущий
    if (this.destroySubjects.has(userId)) {
      this.destroySubjects.get(userId)!.next();
      this.destroySubjects.set(userId, new Subject<void>());
    }

    // Сохраняем состояние работающего таймера
    localStorage.setItem(`${this.STORAGE_PREFIX}${userId}_running`, 'true');

    // Получаем текущее состояние таймера
    const currentState = this.timersSubjects.get(userId)!.getValue();
    let { days, hours, minutes, seconds } = currentState;

    // Создаем таймер, который будет обновляться каждую секунду
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

  /**
   * Останавливает таймер для указанного пользователя
   */
  stopTimer(userId: number): void {
    if (this.destroySubjects.has(userId)) {
      this.destroySubjects.get(userId)!.next();
      // Удаляем метку запущенного таймера
      localStorage.removeItem(`${this.STORAGE_PREFIX}${userId}_running`);
    }
  }

  /**
   * Сбрасывает таймер для указанного пользователя
   */
  resetTimer(userId: number): void {
    this.stopTimer(userId);

    if (this.timersSubjects.has(userId)) {
      const resetState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.timersSubjects.get(userId)!.next(resetState);
      this.saveTimerStateToStorage(userId, resetState);
      // Удаляем метку запущенного таймера
      localStorage.removeItem(`${this.STORAGE_PREFIX}${userId}_running`);
    }
  }

  /**
   * Сохраняет состояние таймера в localStorage
   */
  private saveTimerStateToStorage(userId: number, state: TimerState): void {
    const storageKey = `${this.STORAGE_PREFIX}${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  /**
   * Загружает состояние таймера из localStorage
   */
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

  /**
   * Форматирует числовое значение времени в строку с ведущим нулем при необходимости
   */
  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
