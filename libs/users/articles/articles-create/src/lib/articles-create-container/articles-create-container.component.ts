import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';
import { CreateArticle, articlesActions } from '@users/users/articles/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-articles-create-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesCreateUiComponent
  ],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent {
  private readonly store = inject(Store);

  onCreateArticle(article: CreateArticle) {
    console.log('from create container', article)
    this.store.dispatch(articlesActions.publishArticle({article}))
  }
}
