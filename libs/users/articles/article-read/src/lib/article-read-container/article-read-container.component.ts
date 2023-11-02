import { selectRouteParams } from '@users/core/data-access';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Article, ArticlesActions, ArticleSelectors, CommentsActions, commentsSelectors } from '../../../../data-access/src';
import { selectQueryParam, selectRouteParam } from '../../../../../../core/data-access/src';
import { map, Observable, withLatestFrom, take } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ArticleReadComponent } from '../article-read/article-read.component';
import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { selectLoggedUserId } from '../../../../../../core/auth/data-access/src';
import { selectComments } from '../../../../data-access/src/lib/+state/comments/comments.selectors';
import { selectOpenedArticle } from 'libs/users/articles/data-access/src/lib/+state/articles.selectors';

@Component({
  selector: 'article-read-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticleReadComponent,
    ArticleCommentsComponent,
    LetDirective,
    MatProgressBarModule],
  templateUrl: './article-read-container.component.html',
  styleUrls: ['./article-read-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleReadContainerComponent {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);
  public readonly commentsStatus$ = this.store.select(commentsSelectors.selectStatus)
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);
  public articleComments$ = this.store.select(selectComments);

  public articleId$ = this.store.pipe(select(selectRouteParams))
 
  public openedArticle$: Observable<Article | null> = this.store.select(ArticleSelectors.selectOpenedArticle)
  .pipe(

    map((article) => {
        if (!article) {
        this.store.dispatch(ArticlesActions.getArticleForRead());
      }
      return article 
    })
);

  onSubmitComment(commentText: string) {
    this.loggedUserId$.pipe(withLatestFrom(this.openedArticle$), take(1))
      .subscribe(([authorId, article]) => {
        console.log("authorId, articleId", authorId, article?.id);
        
        const comment = {
          author_id: Number(authorId), 
          article_id: Number(article?.id), 
          text: commentText 
        }
        this.store.dispatch(CommentsActions.publishComment({ comment }))
      })
  }

  constructor() {
    this.openedArticle$.pipe(take(1), withLatestFrom(this.articleId$)).subscribe(([, params]) => {
      this.store.dispatch(CommentsActions.loadComments({ articleId: params['id'] }));
    })
  }
}
