import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimerService } from '../feature-timer-service/timer.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'users-feature-timer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, TranslateModule],
  templateUrl: './feature-timer.component.html',
  styleUrls: ['./feature-timer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTimerComponent {
  constructor(private timerService: TimerService) {
    this.timerData$ = this.timerService.getTimerValue();
    this.timerService.timerSubject$.next({ days: this.timerService.days, hours: this.timerService.hours, minutes: this.timerService.minutes, seconds: this.timerService.seconds });
    this.toggleBtnTimer = this.timerService.getToggleValue();
  }

  timerData$: Observable<{ days: number, hours: number, minutes: string, seconds: string }>;
  toggleBtnTimer: boolean;

  startOrPause() {
    if(this.toggleBtnTimer) {
      this.timerService.pauseTimer();
    }
    if(!this.toggleBtnTimer) {
      this.timerService.startTimer();
    }
    this.toggleBtnTimer = !this.toggleBtnTimer;
    this.timerService.toggleTimer();
  }

  reset() {
    this.timerService.resetTimer();
    this.timerService.timerSubject$.next({ days: this.timerService.days, hours: this.timerService.hours, minutes: this.timerService.minutes, seconds: this.timerService.seconds });
    this.timerService.pauseTimer();
    if(this.toggleBtnTimer) {
      this.toggleBtnTimer = !this.toggleBtnTimer;
      this.timerService.toggleTimer();
    }
  }
}