import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { ProfileStopwatchService } from '../profile-stopwatch-service/profile-stopwatch.service';
import { LetDirective } from '@ngrx/component';


@Component({
  selector: 'profile-stopwatch',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, LetDirective],
  templateUrl: './profile-stopwatch.component.html',
  styleUrls: ['./profile-stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStopwatchComponent {
  private profileStopwatchService = inject(ProfileStopwatchService)

  public stopwatchTime$ = this.profileStopwatchService.stopwatchTime$
  public isStopWatchRunning$ = this.profileStopwatchService.isStopwatchRunning$

  onStart() {
    this.profileStopwatchService.start()
      }

  onPause() {
    this.profileStopwatchService.pause()
  }
}
