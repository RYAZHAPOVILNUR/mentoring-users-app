import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs';

import { articleSelectors, ArticlesFacade } from '@users/articles/data-access-article';
import { commentsActions, commentsSelectors } from '@users/articles/data-access-comment';
import { authSelectors } from '@users/core/data-access-auth';

import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArticleDetailsComponent, ArticleCommentsComponent, LetDirective, MatProgressBarModule],
  templateUrl: './article-details-container.component.html',
  styleUrls: ['./article-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsContainerComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly commentsStatus$ = this.store.select(commentsSelectors.selectStatus);
  public readonly articlesFacade = inject(ArticlesFacade);
  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);
  public readonly articleStatus$ = this.articlesFacade.status$;
  public readonly article$ = this.articlesFacade.openedArticle;

  public articleComments$ = this.store.select(commentsSelectors.selectComments);

  ngOnInit(): void {
    this.articlesFacade.getOne();
  }

  onSubmitComment(commentText: string) {
    this.loggedUserId$.pipe(withLatestFrom(this.article$), take(1)).subscribe(([authorId, article]) => {
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
