import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesViewComponent } from '../articles-view/articles-view.component';
import {select, Store} from '@ngrx/store';
import {ArticleSelectors, ArticlesActions, Article} from '@users/users/articles/data-access';
import { LetDirective } from '@ngrx/component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { selectLoggedUserId } from '@auth/data-access';
import {ArticleReadComponent} from "@users/users/articles/article-read";
import {map, Observable, withLatestFrom} from "rxjs";
import {selectQueryParam} from "@users/core/data-access";


@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesViewComponent,
    LetDirective,
    MatProgressBarModule,
    ArticleReadComponent,
  ],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent {
  private readonly store = inject(Store);

  public readonly articles$ = this.store.select(ArticleSelectors.selectArticles);
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);
  public articleId$ = this.store.pipe(select(selectQueryParam('id')))


  public viewedArticle$: Observable<Article | null> = this.store.select(ArticleSelectors.selectArticleForEdit)
    .pipe(
      withLatestFrom(this.articleId$),
      map(([article, id]) => {
        if (!article && id) {
          this.store.dispatch(ArticlesActions.getArticleForEdit({ id }));
        }
        return article
      })
    );

  constructor() {
    this.store.dispatch(ArticlesActions.loadArticles());
  }
}
