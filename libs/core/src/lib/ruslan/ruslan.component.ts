import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-ruslan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ruslan.component.html',
  styleUrls: ['./ruslan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuslanComponent {}
