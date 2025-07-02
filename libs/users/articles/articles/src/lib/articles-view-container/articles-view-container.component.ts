import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';

import { selectQueryParam } from '@shared/util-store';
import { authSelectors } from '@users/core/data-access-auth';
import { Article, ArticlesActions, ArticleSelectors } from '@users/users/articles/data-access';

import { ArticlesViewComponent } from '../articles-view/articles-view.component';

@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [CommonModule, ArticlesViewComponent, LetDirective, MatProgressBarModule],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent {
  private readonly store = inject(Store);

  public readonly articles$ = this.store.select(ArticleSelectors.selectArticles);
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);
  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);
  public articleId$ = this.store.pipe(select(selectQueryParam('id')));

  public viewedArticle$: Observable<Article | null> = this.store.select(ArticleSelectors.selectArticleForEdit).pipe(
    withLatestFrom(this.articleId$),
    map(([article, id]) => {
      if (!article && id && typeof id === 'string') {
        this.store.dispatch(ArticlesActions.getArticleForEdit({ id }));
      }
      return article;
    }),
  );

  constructor() {
    this.store.dispatch(ArticlesActions.loadArticles());
  }
}
