import { Injectable } from "@angular/core";
import { timer, BehaviorSubject, Subscription } from "rxjs";
import { scan } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class TimeService {
    private timer = this.getSecondsFromLocalStorage();
    public isRunning = this.getIsRunningFromLocalStorage();

    private timer$: BehaviorSubject<number> = new BehaviorSubject(this.timer);
    public isRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isRunning);

    private timerSubscription: Subscription = new Subscription();

    public getTimerValue(): BehaviorSubject<number> {
        return this.timer$;
    }

    public getIsTimerRunning(): BehaviorSubject<boolean> {
        return this.isRunning$;
    }

    constructor() {
        if (this.isRunning) {
            this.startCount();
        }
    }

    startCount(): void {
        this.timerSubscription = timer(0, 1000).pipe(
            scan(acc => ++acc, this.timer)).subscribe((value) => {
                this.timer$.next(value);
                this.saveToLocalStorage(this.timer$.getValue(), true);
            }
            );
        this.isRunning$.next(true);
    }

    stopTimer(): void {
        this.timerSubscription.unsubscribe();
        this.isRunning$.next(false);
        this.timer$.next(0);
        this.saveToLocalStorage(0, false);
    };

    private saveToLocalStorage(seconds: number, isRunning: boolean) {
        const timerObjectJSON = JSON.stringify({ seconds, isRunning });
        localStorage.setItem('timer', timerObjectJSON);
    }

    private getSecondsFromLocalStorage(): number {
        const data = localStorage.getItem('timer');
        if (data) {
            return JSON.parse(data).seconds;
        } else return 0;
    }

    private getIsRunningFromLocalStorage(): boolean {
        const data = localStorage.getItem('timer');
        if (data) {
            return JSON.parse(data).isRunning;
        } else return false;
    }
}
