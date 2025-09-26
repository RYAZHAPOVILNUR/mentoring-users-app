import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { take, withLatestFrom } from 'rxjs';

import { ArticlesFacade } from '@users/articles/data-access-article';
import { CommentsFacade } from '@users/articles/data-access-comment';
import { AuthFacade, authSelectors } from '@users/core/data-access-auth';

import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    LetDirective,
    MatProgressBarModule,
  ],
  templateUrl: './article-details-container.component.html',
  styleUrls: ['./article-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsContainerComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly articlesFacade = inject(ArticlesFacade);
  public readonly сommentsFacade = inject(CommentsFacade);
  public readonly auth = inject(AuthFacade);
  public readonly articleStatus$ = this.articlesFacade.status$;
  public readonly article$ = this.articlesFacade.openedArticle;

  public readonly commentsStatus$ = this.сommentsFacade.status$;
  public readonly comments$ = this.сommentsFacade.comments$;

  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);

  ngOnInit(): void {
    this.articlesFacade.getOne();
    this.сommentsFacade.getAll();
  }
  onSubmitComment(commentText: string) {
    this.loggedUserId$
      .pipe(withLatestFrom(this.article$), take(1))

      .subscribe(([authorId, article]) => {
        console.log('authorId, articleId', authorId, article?.id);

        const comment = {
          article_id: Number(article?.id),
          author_id: Number(authorId),
          text: commentText,
        };
        this.сommentsFacade.add(comment);
      });
  }
}
