import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { ProfileStopwatchService } from '../profile-stopwatch-service/profile-stopwatch.service';
import { SecondsToTimePipe } from './seconds-to-time.pipe';


@Component({
  selector: 'profile-stopwatch',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, SecondsToTimePipe],
  templateUrl: './profile-stopwatch.component.html',
  styleUrls: ['./profile-stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStopwatchComponent {
  private profileStopwatchService = inject(ProfileStopwatchService)

  public timeInSeconds$ = this.profileStopwatchService.timeInSeconds$

  onStartStopwatch() {
    this.profileStopwatchService.playStopwatch()
  }

  onPauseStopwatch() {
    this.profileStopwatchService.pauseStopwatch()
  }
}
