import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '@users/users/articles/data-access';

@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent {

  @Input({ required: true }) articles!: any




}
