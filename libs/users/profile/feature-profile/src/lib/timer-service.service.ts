import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerServiceService {
  private _timeInSeconds = 0;
  private _intervalId: any = null;

  constructor() {
    this.loadFromStorage();
  }

  get timeInSeconds(): number {
    return this._timeInSeconds;
  }

  startTimer(): void {
    if (this._intervalId) return;

    this._intervalId = setInterval(() => {
      this._timeInSeconds++;
      this.saveToStorage();
    }, 1000);
  }

  stopTimer(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
      this.saveToStorage();
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this._timeInSeconds = 0;
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('timerValue', this._timeInSeconds.toString());
  }

  private loadFromStorage(): void {
    const savedTime = localStorage.getItem('timerValue');
    if (savedTime) {
      this._timeInSeconds = parseInt(savedTime, 10) || 0;
    }
  }
}
