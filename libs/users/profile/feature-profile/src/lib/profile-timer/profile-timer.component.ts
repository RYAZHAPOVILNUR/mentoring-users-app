import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Timer, TimerService } from '../profile-timer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-profile-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {
  private timerService = inject(TimerService);
  private changeDetection = inject(ChangeDetectorRef);
  public timer$ = new BehaviorSubject<Timer>(
    {
      sec: '0',
      min: '0',
      hours: '0',
      days: '0'
    }
  )
  public isRunning = this.timerService.isRunning;

  constructor() {
    this.timerService.timer$.pipe(takeUntilDestroyed()).subscribe(
      (val) => {
      this.timer$.next(val);
      }
    )
  }

  public startStopTimer(): void {
    if (!this.isRunning) {
      this.timerService.startTimer();
    } else {
      this.timerService.stopTimer();
    }
    this.isRunning = !this.isRunning;
  }

  public resetTimer(): void {
    this.isRunning = false;
    this.timerService.resetTimer()
  }
}
