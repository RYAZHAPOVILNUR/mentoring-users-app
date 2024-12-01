import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerServiceService } from '../timer-service.service';
import { TimeFormatPipe } from './time-format.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-timer',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, MatIconModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  isRunning = false;
  public timerService = inject(TimerServiceService);
  private cdr = inject(ChangeDetectorRef);

  toggleTimer(): void {
    this.isRunning = !this.isRunning;
    this.isRunning ? this.timerService.startTimer() : this.timerService.stopTimer();
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.isRunning) {
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.isRunning = false;
    this.timerService.resetTimer();
  }
}
