import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-users-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailComponent {}
