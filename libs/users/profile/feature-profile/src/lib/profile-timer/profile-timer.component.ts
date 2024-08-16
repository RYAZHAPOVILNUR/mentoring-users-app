import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Timer, TimerService } from '../profile-timer.service';

@Component({
  selector: 'users-profile-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent implements OnDestroy {
  private timerService = inject(TimerService)
  private changeDestroy = inject(ChangeDetectorRef);
  public timer!: Timer;
  private subscriptions = new Subscription();
  public isRunning = this.timerService.isRunning;
  
  constructor() {
    this.subscriptions.add(
      this.timerService.timer$.subscribe(
        (val: Timer) => {
          this.timer = val
          this.changeDestroy.markForCheck()
        }
      )
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
