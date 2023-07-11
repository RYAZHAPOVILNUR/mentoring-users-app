import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-users-articles-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-articles-data-access.component.html',
  styleUrls: ['./users-articles-data-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersArticlesDataAccessComponent {}
