import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { ProfileTimerService } from '../profile-timer-service/profile-timer.service';
import { SecondsToTimePipe } from './seconds-to-time.pipe';


@Component({
  selector: 'profile-timer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, SecondsToTimePipe],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {
  private profileTimerService = inject(ProfileTimerService)

  public timeInSeconds$ = this.profileTimerService.timeInSeconds$

  onStartTimer() {
    this.profileTimerService.playTimer()
  }

  onPauseTimer() {
    this.profileTimerService.pauseTimer()
  }
}
