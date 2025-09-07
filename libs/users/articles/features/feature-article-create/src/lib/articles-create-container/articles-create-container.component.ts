import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { DeactivatableComponent } from '@shared/util-router';
import { articlesActions, articleSelectors, CreateArticle } from '@users/articles/data-access-article';
import { Article } from '@users/shared/data-access-models';

import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';

@Component({
  standalone: true,
  imports: [LetDirective, ArticlesCreateUiComponent],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent implements DeactivatableComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly confirmDialogService = inject(ConfirmDialogService);

  private readonly articleId = this.activatedRoute.snapshot.queryParamMap.get('id');

  private isFormChanged = false;

  readonly isEdit = Boolean(this.articleId);
  readonly editingArticle$ = this.store.select(articleSelectors.selectArticleForEdit);

  constructor() {
    if (Number(this.articleId)) {
      this.getArticle(Number(this.articleId));
    }
  }

  onPublishArticle(article: CreateArticle) {
    console.log(article);
  }

  onFormChange(isFormChanged: boolean) {
    this.isFormChanged = isFormChanged;
  }

  canDeactivate(): Observable<boolean> {
    if (!this.isFormChanged) {
      return of(true);
    }

    return this.confirmDialogService
      .open({
        title: 'Подтверждение выхода',
        content: 'Вы уверены, что хотите покинуть данную страницу?<br>Несохранённые изменения будут утеряны!',
        primaryButtonText: 'Покинуть страницу',
        secondaryButtonText: 'Остаться',
      })
      .afterClosed()
      .pipe(map(Boolean));
  }

  private getArticle(id: Article['id']) {
    this.store.dispatch(articlesActions.getArticleForEdit({ id }));
  }
}
