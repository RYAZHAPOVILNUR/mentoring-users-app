import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {}
