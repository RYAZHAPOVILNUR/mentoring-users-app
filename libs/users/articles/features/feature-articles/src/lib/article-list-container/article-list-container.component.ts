import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { Article } from '@users/core/data-access-models';
import { map, Observable, withLatestFrom } from 'rxjs';

import { selectQueryParam } from '@shared/util-store';
import { articlesActions, articleSelectors } from '@users/articles/data-access-article';
import { AuthStore } from '@users/core/data-access-auth';

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
  private readonly authStore = inject(AuthStore);

  public readonly articles$ = this.store.select(articleSelectors.selectArticles);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly loggedUserId$ = toObservable(this.authStore.loggedUserId);
  public articleId$ = this.store.pipe(select(selectQueryParam('id')));

  public viewedArticle$: Observable<Article | null> = this.store.select(articleSelectors.selectArticleForEdit).pipe(
    withLatestFrom(this.articleId$),
    map(([article, id]) => {
      if (!article && id && typeof id === 'string') {
        this.store.dispatch(articlesActions.getArticleForEdit({ id }));
      }
      return article;
    }),
  );

  constructor() {
    this.store.dispatch(articlesActions.loadArticles());
  }
}
