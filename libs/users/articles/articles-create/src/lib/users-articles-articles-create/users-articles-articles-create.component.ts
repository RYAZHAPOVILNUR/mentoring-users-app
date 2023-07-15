import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-articles-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-articles-articles-create.component.html',
  styleUrls: ['./users-articles-articles-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersArticlesCreateComponent {}
