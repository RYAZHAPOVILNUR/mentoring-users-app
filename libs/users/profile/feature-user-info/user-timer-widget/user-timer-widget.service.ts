import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerWidgetState } from './user-timer-widget.model';
import { TimerWidgetStorage } from './user-timer-widget.storage';
import { formatTimerWidgetElapsedTime, TimerWidgetFormattedTime } from './user-timer-widget-format-time.util';

@Injectable({ providedIn: 'root' })

export class TimerService {
    private readonly state$ = new BehaviorSubject<TimerWidgetState>(this.loadState());
    readonly formattedTime$: Observable<TimerWidgetFormattedTime> = this.state$.pipe(
        map(state => formatTimerWidgetElapsedTime(state.elapsedTime))
    );
    readonly isRunning$: Observable<boolean> = this.state$.pipe(
        map(state => state.isRunning)
    );
    private tickSub: Subscription | null = null;

    constructor() {
        if (this.state$.value.isRunning) {
            this.resume();
        }
    }

    resume(): void {
        this.loadState();
    }

    start(): void {
        const state = this.state$.value;
        if (state.isRunning) return;
        const startTime = Date.now();
        const newState = {...state, isRunning: true, startTime};

        this.state$.next(newState);
        this.saveState();
        this.tickSub = interval(1000).subscribe(() => {
            const now = Date.now();
            const updatedState = this.state$.value;
            const elapsed = updatedState.elapsedTime + (now - updatedState.startTime!);
            const next = {...updatedState, elapsedTime: elapsed, startTime: now}

            this.state$.next(next);
            this.saveState();
        })
    }

    pause(): void {
        this.tickSub?.unsubscribe();
        this.tickSub = null;
        const state = this.state$.value;
        const newState = {
            ...state,
            isRunning: false,
            startTime: null,
        };

        this.state$.next(newState);
        this.saveState();
    }

    stop(): void {
        this.tickSub?.unsubscribe();
        this.tickSub = null;
        const state = this.state$.value;
        const newState = {
            ...state,
            isRunning: false,
            elapsedTime: 0,
            startTime: null,
        };
        this.state$.next(newState);
        this.saveState();
    }

    private loadState(): TimerWidgetState {
        return TimerWidgetStorage.load() ?? {
            isRunning: false,
            startTime: null,
            elapsedTime: 0,
        };
    }

    private saveState(): void {
        TimerWidgetStorage.save(this.state$.value);
    }
}