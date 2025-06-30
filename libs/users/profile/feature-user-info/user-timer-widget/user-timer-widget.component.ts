import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TimerService } from './user-timer-widget.service';


@Component({
  selector: 'users-user-timer-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './user-timer-widget.component.html',
  styleUrls: ['./user-timer-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserTimerWidgetComponent {
  constructor(private timerService: TimerService) {}

  get formattedTime$() {
    return this.timerService.formattedTime$;
  } 
  get isRunning$() {
    return this.timerService.isRunning$;
  }

  onStartTimer(): void {
    this.timerService.start();
  }

  onStopTimer(): void {
    this.timerService.stop();
  }

  onPauseTimer(): void {
    this.timerService.pause();
  }
}
