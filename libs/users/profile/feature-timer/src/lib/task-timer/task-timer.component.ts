import { Component, inject } from "@angular/core";
import { TaskTimerService, TimerState } from "../task-timer-service/task-timer.service";
import { CommonModule } from "@angular/common";
import { FormatTimePipe } from "./format-time.pipes";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'users-task-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatButtonModule],
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss'],
})
export class TaskTimerComponent {
    private readonly timerService: TaskTimerService = inject(TaskTimerService);
    public readonly state$: BehaviorSubject<TimerState> = this.timerService.getState();
    public readonly displayedTime$ = this.state$.pipe(map(state => state.seconds));
    public readonly isRunning$ = this.state$.pipe(map(state => state.isActive));
    public readonly isStopButtonDisabled$ = combineLatest([this.isRunning$, this.displayedTime$]).pipe(
        map(([isRunning, time]) => !isRunning && time === 0)
    );
    
    public startTimer(): void {
        this.timerService.startTimer();
    }
    
    public pauseTimer(): void {
        this.timerService.pauseTimer();
    }
    
    public stopTimer(): void {
        this.timerService.stopTimer();
    }
}
