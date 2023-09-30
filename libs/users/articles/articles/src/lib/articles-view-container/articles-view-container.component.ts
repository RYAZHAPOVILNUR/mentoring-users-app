import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesViewComponent } from '../articles-view/articles-view.component';
import { Store } from '@ngrx/store';
import { ArticleSelectors, ArticlesActions } from '@users/users/articles/data-access';
import { LetDirective } from '@ngrx/component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { selectLoggedUserId } from '@auth/data-access';
import { selectAllUsers, UsersFacade } from "@users/users/data-access";


@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesViewComponent,
    LetDirective,
    MatProgressBarModule
  ],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent {
  private readonly store = inject(Store);
  private userFacade = inject(UsersFacade)

  public readonly articles$ = this.store.select(ArticleSelectors.selectArticles);
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);
  public readonly allUsers$ = this.store.select(selectAllUsers);

  constructor() {
    this.userFacade.init();
    this.store.dispatch(ArticlesActions.loadArticles());
  }
}
