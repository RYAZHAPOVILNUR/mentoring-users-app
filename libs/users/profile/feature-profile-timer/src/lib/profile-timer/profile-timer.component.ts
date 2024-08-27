import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-timer.component.html',
  styleUrls: ['./profile-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTimerComponent {}
