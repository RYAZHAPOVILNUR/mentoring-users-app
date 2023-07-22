import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesViewComponent } from '../articles-view/articles-view.component';
import { Store } from '@ngrx/store';
import { ArticleSelectors, ArticlesActions } from '@users/users/articles/data-access';
import { LetDirective } from '@ngrx/component';


@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesViewComponent,
    LetDirective
  ],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent {
  private readonly store = inject(Store);

  // public readonly articles = this.store.select(articlesFeature.selectEntities).pipe(
  //   map((articlesObj) => Object.values(articlesObj))
  // );
  // public readonly articles$ = this.store.select(articlesFeature.selectEntities)

  public readonly articles$ = this.store.select(ArticleSelectors.selectArticles)

  constructor() {
    this.store.dispatch(ArticlesActions.loadArticles());
  }
}
