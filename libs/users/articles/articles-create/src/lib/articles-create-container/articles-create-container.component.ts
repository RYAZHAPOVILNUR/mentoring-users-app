import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';
import { CreateArticle, articlesActions } from '@users/users/articles/data-access';
import { Store } from '@ngrx/store';
import { DeactivatableComponent } from '@users/core/utils';
import { MatDialog } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-articles-create-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesCreateUiComponent
  ],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent implements DeactivatableComponent {

  private readonly store = inject(Store);
  private dialog = inject(MatDialog)
  private isFormChange = false;
  private readonly destroyRef = inject(DestroyRef);

  onCreateArticle(article: CreateArticle) {
    console.log('from create container', article)
    this.store.dispatch(articlesActions.publishArticle({ article }))
  }

  onFormChange(isFormChage: boolean) {
    this.isFormChange = isFormChage
  }

  canDeactivate() {
    if (!this.isFormChange) {
      return true
    } else {
      return this.dialog.open(CoreUiConfirmDialogComponent, {
        data: { dialogText: `Вы уверены что хотите покинуть данную страницу? Несохранённые изменения будут утеряны!` },
      })
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef),
          map((result: boolean) => result)
        )
    }
  }

}
