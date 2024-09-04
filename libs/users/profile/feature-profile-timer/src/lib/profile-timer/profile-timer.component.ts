import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { ProfileTimerService } from '../profile-timer-service/profile-timer.service';
import { LetDirective } from '@ngrx/component';
import { SecondsToTimePipe } from './seconds-to-time.pipe';


@Component({
  selector: 'profile-timer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, LetDirective, SecondsToTimePipe],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {
  private profileTimerService = inject(ProfileTimerService)

  public seconds$ = this.profileTimerService.seconds$
  public isRunning$ = this.profileTimerService.isRunning$

  onStart() {
    this.profileTimerService.start()
      }

  onPause() {
    this.profileTimerService.pause()
  }
}

