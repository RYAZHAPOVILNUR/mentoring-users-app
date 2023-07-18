import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesViewComponent } from '../articles-view/articles-view.component';

@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesViewComponent
  ],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent { }
