import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Article, ArticlesActions, ArticleSelectors } from '../../../../data-access/src';
import { selectQueryParam } from '../../../../../../core/data-access/src';
import { map, Observable, withLatestFrom } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ArticleReadComponent } from '../article-read/article-read.component';
import { selectLoggedUserId } from '../../../../../../core/auth/data-access/src';

@Component({
  selector: 'article-read-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticleReadComponent,
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
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);

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

  constructor() {

  }
}
