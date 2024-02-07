import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-users-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-users-filter.component.html',
  styleUrls: ['./feature-users-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureUsersFilterComponent {}
