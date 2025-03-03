import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, timer } from "rxjs";

const TIMER_KEY = "timer";

export interface TimerState {
  seconds: number;
  isActive: boolean;
  lastUpdateTime: number;
}

@Injectable({
  providedIn: "root",
})
export class TaskTimerService implements OnDestroy{
  private state: TimerState = this.loadState();
  private state$ = new BehaviorSubject<TimerState>(this.state);
  private timerSubscription: Subscription | null = null;
  
  constructor() {
    if (this.state.isActive) {
      this.adjustForPassedTime();
      this.startTimerSubscription();
    }
  }
  
  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
  
  public getState(): BehaviorSubject<TimerState> {
    return this.state$;
  }
  
  public startTimer(): void {
    this.state.isActive = true;
    this.state.lastUpdateTime = Date.now();
    this.updateState();
    this.startTimerSubscription();
  }
  
  public pauseTimer(): void {
    if (this.state.isActive) {
      this.state.seconds += Math.floor((Date.now() - this.state.lastUpdateTime) / 1000);
      this.state.isActive = false;
      this.updateState();
      this.stopTimerSubscription();
    }
  }
  
  public stopTimer(): void {
    this.state.seconds = 0;
    this.state.isActive = false;
    this.updateState();
    this.stopTimerSubscription();
  }
  
  private startTimerSubscription(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.state.seconds++;
      this.state.lastUpdateTime = Date.now();
      this.state$.next(this.state);
    });
  }
  
  private stopTimerSubscription(): void {
    this.timerSubscription?.unsubscribe();
  }
  
  private adjustForPassedTime(): void {
    if (this.state.isActive) {
      const now = Date.now();
      const passedSeconds = Math.floor((now - this.state.lastUpdateTime) / 1000);
      this.state = { 
        ...this.state,
        seconds: this.state.seconds + passedSeconds,
        lastUpdateTime: now
      };
      this.state$.next(this.state);
    }
  }
  
  private loadState(): TimerState {
    try {
      const data = localStorage.getItem(TIMER_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (
          typeof parsed.seconds === "number" && 
          typeof parsed.isActive === "boolean" &&
          typeof parsed.lastUpdateTime === "number"
        ) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading timer state:", error);
    }
    return { seconds: 0, isActive: false, lastUpdateTime: Date.now()};
  }
  
  private updateState(): void {
    this.state$.next(this.state);
    this.saveState();
  }
  
  private saveState(): void {
    try {
      localStorage.setItem(TIMER_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.error("Error saving timer state:", error);
    }
  }
}
