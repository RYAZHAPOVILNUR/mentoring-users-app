import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../timer.service/timer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'users-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  private timerService = inject(TimerService);

  public isTimerOn$ = new BehaviorSubject<boolean>(true);
  public timer$ = this.timerService.timerData$;

  public start(): void {
    this.isTimerOn$.next(false);
    this.timerService.startTimer();
  }

  public stop(): void {
    this.isTimerOn$.next(true);
    this.timerService.stopTimer();
  }
}
