import { Component, inject } from "@angular/core";
import { TaskTimerService } from "../task-timer-service/task-timer.service";
import { CommonModule } from "@angular/common";
import { FormatTimePipe } from "./format-time.pipes";
import { BehaviorSubject } from "rxjs";
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
      public readonly isRunning$: BehaviorSubject<boolean> = this.timerService.getIsTimerActive();
      public readonly timerValue$: BehaviorSubject<number> = this.timerService.getTimerValue();
      public readonly isStopped$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
      
      private setStoppedState(IsStopped:boolean): void {
          this.isStopped$.next(IsStopped);
      }
      
      public startTimer(): void {
          this.timerService.startTimer();
          this.setStoppedState(false);
      }
      
      public pauseTimer(): void {
          this.timerService.pauseTimer();
          this.setStoppedState(false);
      }
      
      public stopTimer(): void {
          this.timerService.stopTimer();
          this.setStoppedState(true);
      }
}
