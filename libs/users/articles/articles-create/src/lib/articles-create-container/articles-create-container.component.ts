import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';
import {
  CreateArticle,
  ArticlesActions,
  ArticleSelectors,
  Article,
} from '@users/users/articles/data-access';
import { Store, select } from '@ngrx/store';
import { DeactivatableComponent } from '@users/core/utils';
import { MatDialog } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Observable, filter, first, map, tap, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectQueryParam } from '@users/core/data-access';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-articles-create-container',
  standalone: true,
  imports: [CommonModule, ArticlesCreateUiComponent, LetDirective],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ArticlesCreateContainerComponent implements DeactivatableComponent {
  private readonly store = inject(Store);
  private dialog = inject(MatDialog);
  private isFormChange = false;
  private isEditMode = false;
  private readonly destroyRef = inject(DestroyRef);

  public editMode$ = this.store.pipe(
    takeUntilDestroyed(this.destroyRef), //Почему не происходит отписка?
    select(selectQueryParam('mode')),
    filter((mode) => mode !== undefined),
    map((mode) => mode === 'edit')
  );

  ngOnInit(): void {
    this.editMode$.pipe(first()).subscribe((mode) => (this.isEditMode = mode));
  }

  public articleId$ = this.store.pipe(select(selectQueryParam('id')));

  public editingArticle$: Observable<Article | null> = this.store
    .select(ArticleSelectors.selectArticleForEdit)
    .pipe(
      withLatestFrom(this.articleId$),
      map(([article, id]) => {
        if (!article && id) {
          this.store.dispatch(ArticlesActions.getArticleForEdit({ id }));
        }
        return article;
      })
    );

  onPublishArticle(article: CreateArticle) {
    this.store.dispatch(ArticlesActions.publishArticle({ article }));
  }

  onFormChange(isFormChage: boolean) {
    this.isFormChange = isFormChage;
  }

  canDeactivate() {
    if (!this.isFormChange) {
      return true;
    }
    if (this.isEditMode) {
      return this.dialog
        .open(CoreUiConfirmDialogComponent, {
          data: {
            dialogText: `Вы уверены что хотите покинуть данную страницу? Несохранённые изменения будут утеряны!`,
          },
        })
        .afterClosed()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter((result: boolean) => result != undefined),
          map((result: boolean) => result)
        );
    } else {
      return true;
    }
  }
}
