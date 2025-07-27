import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { Article } from '@users/core/data-access-models';
import { map, Observable, take, withLatestFrom } from 'rxjs';

import { selectRouteParams } from '@shared/util-store';
import { articlesActions, articleSelectors } from '@users/articles/data-access-article';
import { commentsActions, commentsSelectors } from '@users/articles/data-access-comment';
import { AuthStore } from '@users/core/data-access-auth';

import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArticleDetailsComponent, ArticleCommentsComponent, LetDirective, MatProgressBarModule],
  templateUrl: './article-details-container.component.html',
  styleUrls: ['./article-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsContainerComponent {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly commentsStatus$ = this.store.select(commentsSelectors.selectStatus);
  public readonly loggedUserId$ = toObservable(this.authStore.loggedUserId);
  public articleComments$ = this.store.select(commentsSelectors.selectComments);

  public articleId$ = this.store.pipe(select(selectRouteParams));

  public openedArticle$: Observable<Article | null> = this.store.select(articleSelectors.selectOpenedArticle).pipe(
    map((article) => {
      if (!article) {
        this.store.dispatch(articlesActions.getArticleForRead());
      }
      return article;
    }),
  );

  constructor() {
    this.openedArticle$.pipe(take(1), withLatestFrom(this.articleId$)).subscribe(([, params]) => {
      this.store.dispatch(commentsActions.loadComments({ articleId: params['id'] }));
    });
  }
  onSubmitComment(commentText: string) {
    this.loggedUserId$.pipe(withLatestFrom(this.openedArticle$), take(1)).subscribe(([authorId, article]) => {
      console.log('authorId, articleId', authorId, article?.id);

      const comment = {
        author_id: Number(authorId),
        article_id: Number(article?.id),
        text: commentText,
      };
      this.store.dispatch(commentsActions.publishComment({ comment }));
    });
  }
}
