import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription, timer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskTimerService {
  
  private seconds: number = this.getSecondsFromLocalStorage();
  private isActive: boolean = this.getIsActiveFromLocalStorage();
  
  private seconds$:BehaviorSubject<number> = new BehaviorSubject<number>(this.seconds);
  public isActive$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isActive);
  
  private timerSubscription: Subscription = new Subscription();
  
  public getTimerValue(): BehaviorSubject<number> {
    return this.seconds$;
  }
  
  public getIsTimerActive(): BehaviorSubject<boolean> {
    return this.isActive$;
  }
  
  constructor() {
    if (this.isActive) {
      this.startTimer();
    }
  }
  
  public startTimer(): void {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.seconds++;
      this.seconds$.next(this.seconds);
      this.updateLocalStorage(this.seconds, this.isActive);
    });
    this.isActive = true;
    this.isActive$.next(this.isActive);
    this.updateLocalStorage(this.seconds, this.isActive);
  }
  
  public pauseTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isActive = false;
    this.isActive$.next(this.isActive);
    this.updateLocalStorage(this.seconds, false);
  }
  
  public stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isActive = false;
    this.isActive$.next(this.isActive);
    this.seconds = 0;
    this.seconds$.next(this.seconds);
    this.updateLocalStorage(this.seconds, this.isActive);
  }
  
  private getSecondsFromLocalStorage(): number {
    const data = localStorage.getItem("timer");
    return data ? JSON.parse(data).seconds : 0;
  }
  
  private getIsActiveFromLocalStorage(): boolean {
    const data = localStorage.getItem("timer");
    return data ? JSON.parse(data).isActive : false;
  }
  
  private updateLocalStorage(seconds: number, isActive: boolean): void {
    localStorage.setItem("timer", JSON.stringify({ seconds, isActive }));
  }
}
