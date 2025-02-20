import { Component, inject } from "@angular/core";
import { TaskTimerService } from "../task-timer-service/task-timer.service";
import { CommonModule } from "@angular/common";
import { FormatTimePipe } from "./format-time.pipes";

@Component({
  selector: "users-task-timer",
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: "./task-timer.component.html",
  styleUrls: ["./task-timer.component.scss"],
})
export class TaskTimerComponent {
    private timerService = inject(TaskTimerService);
    
    public isRunning = this.timerService.getIsTimerActive();
    public timerValue$ = this.timerService.getTimerValue();
    
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
