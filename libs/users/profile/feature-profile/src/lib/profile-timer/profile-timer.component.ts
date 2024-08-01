import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from './profile-timer.service';

@Component({
  selector: 'users-profile-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProfileTimerComponent {
  private timerService = inject(TimerService);
  public count$ = this.timerService.timerCount$;
  public isToggled = this.timerService.isToggled;

  public onStartTimer() {
    this.timerService.startTimer();
    this.isToggled = this.timerService.isToggled;
  }

  onPauseTimer() {
    this.timerService.pauseTimer();
    this.isToggled = this.timerService.isToggled;
  }

  public onResetTimer() {
    this.isToggled = false;
    this.timerService.stopTimer();
  }
}
