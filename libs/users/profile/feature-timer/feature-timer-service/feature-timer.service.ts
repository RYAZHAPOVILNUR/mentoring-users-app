import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, map, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureTimerService {
  private timerSubject = new BehaviorSubject({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  public timer$ = this.timerSubject.asObservable();
  private stopTimer$: Subject<void> = new Subject();
  private baseTime = 0;

  private isActiveSubject = new BehaviorSubject<boolean>(false);
  public isActive$ = this.isActiveSubject.asObservable();

  constructor() {
    const timerLocal = localStorage.getItem('time');
    if (timerLocal) {
      this.timerSubject.next(JSON.parse(timerLocal));
      this.baseTime = this.getTotalSeconds();
    }
  }

  public startOrPause() {
    if (this.isActiveSubject.getValue()) {
      this.stopTimer$.next();
      this.isActiveSubject.next(false);
      this.baseTime = this.getTotalSeconds();
      this.save();
      return;
    }

    this.isActiveSubject.next(true);

    timer(0, 1000)
      .pipe(takeUntil(this.stopTimer$))
      .subscribe((secondsElapsed) => {
        const totalSeconds = this.baseTime + secondsElapsed;
        const { days, hours, minutes, seconds } = this.getTime(totalSeconds);

        this.timerSubject.next({ days, hours, minutes, seconds });
      });
  }

  private getTime(seconds: number) {
    return {
      days: Math.floor(seconds / (24 * 60 * 60)),
      hours: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
      minutes: Math.floor((seconds % (60 * 60)) / 60),
      seconds: seconds % 60,
    };
  }

  private getTotalSeconds(): number {
    const { days, hours, minutes, seconds } = this.timerSubject.getValue();
    return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  }

  public reset() {
    this.timerSubject.next({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    this.stopTimer$.next();
    this.isActiveSubject.next(false);
    this.baseTime = 0;
    localStorage.removeItem('time');
  }

  private save() {
    localStorage.setItem('time', JSON.stringify(this.timerSubject.getValue()));
    this.baseTime = this.getTotalSeconds();
  }
}
