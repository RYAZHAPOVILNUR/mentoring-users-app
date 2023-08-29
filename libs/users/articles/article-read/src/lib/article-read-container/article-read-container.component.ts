import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Article, ArticlesActions, ArticleSelectors, CommentsActions, commentsSelectors } from '../../../../data-access/src';
import { selectQueryParam } from '../../../../../../core/data-access/src';
import { map, Observable, withLatestFrom, take } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ArticleReadComponent } from '../article-read/article-read.component';
import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { selectLoggedUserId } from '../../../../../../core/auth/data-access/src';
import { selectComments } from '../../../../data-access/src/lib/+state/comments/comments.selectors';

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

  public articleId$ = this.store.pipe(select(selectQueryParam('id')))
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);
  public readonly commentsStatus$ = this.store.select(commentsSelectors.selectStatus)
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);
  public articleComments$ = this.store.select(selectComments);

  public viewedArticle$: Observable<Article | null> = this.store.select(ArticleSelectors.selectArticleForEdit)
    .pipe(
      withLatestFrom(this.articleId$),
      map(([article, id]) => {
        if (!article && id) {
          this.store.dispatch(ArticlesActions.getArticle({ id }));
        }
        return article
      })
    );

  onSubmitComment(commentText: string) {
    this.loggedUserId$.pipe(withLatestFrom(this.articleId$), take(1))
      .subscribe(([authorId, articleId]) => {
        const comment = { 
          author_id: Number(authorId), 
          article_id: Number(articleId), 
          text: commentText 
        }
        this.store.dispatch(CommentsActions.publishComment({ comment }))
      })
  }

  constructor() {
    this.articleId$.pipe(take(1)).subscribe(articleId => {
      this.store.dispatch(CommentsActions.loadComments({ articleId: Number(articleId) }));
    })
  }
}
