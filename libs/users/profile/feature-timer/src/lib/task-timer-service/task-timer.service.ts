import { Injectable } from "@angular/core";
import { BehaviorSubject, scan, Subscription, timer } from "rxjs";

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
  }
  
  public pauseTimer(): void {
    this.timerSubscription.unsubscribe();
    this.isActive$.next(false);
    this.updateLocalStorage(this.seconds, false);
  }
  
  public stopTimer(): void {
    this.timerSubscription.unsubscribe();
    this.isActive$.next(false);
    this.seconds$.next(0);
    this.updateLocalStorage(0, false);
  }
  
  // public startTimer(): void {
  //   this.timerSubscription = timer(0, 1000).pipe(
  //     scan(acc => ++acc, this.seconds)).subscribe(
  //       (value) => {
  //         this.seconds$.next(value);
  //         this.updateLocalStorage(value, true);
  //       }
  //   );
  //   this.isActive$.next(true);
  // }
  
  private getSecondsFromLocalStorage(): number {
    const data = localStorage.getItem("timer");
    if (data) {
      return JSON.parse(data).seconds;
    } else return 0;
  }
  
  private getIsActiveFromLocalStorage(): boolean {
    const data = localStorage.getItem("timer");
    if (data) {
      return JSON.parse(data).isActive;
    } else return false;
  }
  
  private updateLocalStorage(seconds: number, isActive: boolean): void {
    localStorage.setItem("timer", JSON.stringify({ seconds: this.seconds, isActive: this.isActive }));
  }
}