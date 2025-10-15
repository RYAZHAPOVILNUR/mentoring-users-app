import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';

import { ArticlesFacade } from '@users/articles/data-access-article';
import { authSelectors } from '@users/core/data-access-auth';

import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, ArticleListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './article-list-container.component.html',
  styleUrls: ['./article-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListContainerComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly articleFacade = inject(ArticlesFacade);
  public readonly articles$ = this.articleFacade.articles$;
  public readonly status$ = this.articleFacade.status$;
  public readonly loggedUserId$ = this.store.select(authSelectors.selectLoggedUserId);

  ngOnInit(): void {
    this.articles$
      .pipe(
        take(1),
        tap((articles) => {
          if (!articles.length) {
            this.articleFacade.getAll();
          }
        }),
      )
      .subscribe();
  }
}
