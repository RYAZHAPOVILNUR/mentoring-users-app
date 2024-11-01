import { Component, inject } from "@angular/core";
import { TimeService } from "../task-timer-service/task-timer.service";
import { CommonModule } from "@angular/common";
import { FormatTime } from './format-time.pipes';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'users-task-timer',
    standalone: true,
    imports: [CommonModule, MatButtonModule, FormatTime],
    templateUrl: './task-timer.component.html',
    styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent {
    private timerService = inject(TimeService);

    public isRunning = this.timerService.getIsTimerRunning();
    public timerData$ = this.timerService.getTimerValue();

    public startCount(): void {
        this.timerService.startCount();
    }

    public stopCount(): void {
        this.timerService.stopTimer();
    }
}