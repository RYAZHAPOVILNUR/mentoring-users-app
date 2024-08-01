import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../profile-timer.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-profile-timer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {
  private timerService = inject(TimerService);
  public count$ = this.timerService.timerCount$;
  public isToggled = this.timerService.isToggled;

  public onStartTimer(): void {
    this.timerService.startTimer();
    this.isToggled = this.timerService.isToggled;
  }

  public onPauseTimer(): void {
    this.timerService.pauseTimer();
    this.isToggled = this.timerService.isToggled;
  }

  public onResetTimer(): void {
    this.isToggled = false;
    this.timerService.stopTimer();
  }
}
