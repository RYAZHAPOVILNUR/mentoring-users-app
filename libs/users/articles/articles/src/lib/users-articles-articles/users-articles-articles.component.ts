import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-users-articles-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-articles-articles.component.html',
  styleUrls: ['./users-articles-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersArticlesArticlesComponent {}
