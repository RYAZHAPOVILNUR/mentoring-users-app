import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';

import { selectQueryParam } from '@shared/util-store';
import { articlesActions, articleSelectors } from '@users/articles/data-access-article';
import { authSelectors } from '@users/core/data-access-auth';
import { Article } from '@users/shared/data-access-models';

import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArticleListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './article-list-container.component.html',
  styleUrls: ['./article-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListContainerComponent {
  private readonly store = inject(Store);

  public readonly articles$ = this.store.select(articleSelectors.selectArticles);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);
  public articleId$ = this.store.pipe(select(selectQueryParam('id')));

  public viewedArticle$: Observable<Article | null> = this.store.select(articleSelectors.selectArticleForEdit).pipe(
    withLatestFrom(this.articleId$),
    map(([article, id]) => {
      if (!article && id && typeof id === 'string') {
        this.store.dispatch(articlesActions.getArticleForEdit({ id: Number(id) }));
      }
      return article;
    }),
  );

  constructor() {
    this.store.dispatch(articlesActions.loadArticles());
  }
}
