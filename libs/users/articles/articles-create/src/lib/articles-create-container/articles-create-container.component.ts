import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { filter, first, map, Observable, tap, withLatestFrom } from 'rxjs';

import { DeactivatableComponent } from '@shared/util-router';
import { selectQueryParam } from '@shared/util-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Article, ArticlesActions, ArticleSelectors, CreateArticle } from '@users/users/articles/data-access';

import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';

@Component({
  selector: 'users-articles-create-container',
  standalone: true,
  imports: [CommonModule, ArticlesCreateUiComponent, LetDirective],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent implements DeactivatableComponent, OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private dialogText = '';
  private article: CreateArticle | null = null;
  private isFormChange = false;
  private isEditMode = false;

  public editMode$ = this.store.pipe(
    takeUntilDestroyed(this.destroyRef), //Почему не происходит отписка?
    select(selectQueryParam('mode')),
    filter((mode) => mode !== undefined),
    map((mode) => mode === 'edit'),
  );

  public articleId$ = this.store.pipe(select(selectQueryParam('id')));
  public editingArticle$: Observable<Article | null> = this.store.select(ArticleSelectors.selectArticleForEdit).pipe(
    withLatestFrom(this.articleId$),
    map(([article, id]) => {
      if (!article && id && typeof id === 'string') {
        this.store.dispatch(ArticlesActions.getArticleForEdit({ id }));
      }
      return article;
    }),
  );
  ngOnInit(): void {
    this.editMode$.pipe(first()).subscribe((mode) => (this.isEditMode = mode));

    this.dialogText = `Вы уверены что хотите опубликовать данную статью?`;
    if (this.isEditMode) {
      this.dialogText = `Вы уверены что хотите покинуть данную страницу? Несохранённые изменения будут утеряны!`;
    }
  }

  onPublishArticle(article: CreateArticle) {
    this.article = article;
    console.log(this.article);
  }

  onFormChange(isFormChage: boolean) {
    this.isFormChange = isFormChage;
  }

  canDeactivate() {
    if (!this.isFormChange) {
      return true;
    }
    return this.dialog
      .open(CoreUiConfirmDialogComponent, {
        data: {
          dialogText: this.dialogText,
        },
      })
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((result: boolean) => result != undefined),
        tap((result) => {
          if (this.article && result) this.store.dispatch(ArticlesActions.publishArticle({ article: this.article }));

          if (this.article && this.article.articlesId && result) {
            this.store.dispatch(
              ArticlesActions.editArticle({ articleData: this.article, id: this.article.articlesId }),
            );
          }
        }),
        map((result: boolean) => result),
      );
  }
}
