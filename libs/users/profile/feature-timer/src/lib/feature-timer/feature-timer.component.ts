import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTimerService } from '../../../feature-timer-service/feature-timer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormatedTimePipe } from './FormatedTime.pipe';

@Component({
  selector: 'users-feature-timer',
  standalone: true,
  imports: [CommonModule, FormatedTimePipe, MatIconModule, MatButtonModule],
  templateUrl: './feature-timer.component.html',
  styleUrls: ['./feature-timer.component.css'],
})
export class FeatureTimerComponent {
  private featureTimerService = inject(FeatureTimerService);
  public timer$ = this.featureTimerService.timer$;
  public isActive$ = this.featureTimerService.isActive$;

 public startOrPause() {
    this.featureTimerService.startOrPause();
  }

 public reset() {
    this.featureTimerService.reset();
  }
}
