import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { ProfileTimerService } from '../profile-timer-service/profile-timer.service';
import { LetDirective } from '@ngrx/component';


@Component({
  selector: 'profile-timer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, LetDirective],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {
  private profileTimerService = inject(ProfileTimerService)

  public timerTime$ = this.profileTimerService.timerTime$
  public isTimerRunning$ = this.profileTimerService.isTimerRunning$

  onStart() {
    this.profileTimerService.start()
      }

  onPause() {
    this.profileTimerService.pause()
  }
}
