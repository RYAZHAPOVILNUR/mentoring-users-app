import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { Folder, FoldersActions, FoldersFacade } from '@users/materials/data-access-folders';
import { FoldersAddButtonComponent } from '@users/materials/feature-folder-create';

import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListVM } from '../folders-list/folders-list.interface';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly actions$ = inject(Actions);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.foldersStatus$;
  public readonly error$ = this.foldersFacade.foldersError$;
  public vm$!: Observable<FoldersListVM>;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
    this.setupActionListeners();
    this.vm$ = combineLatest([this.folders$, this.status$, this.error$]).pipe(
      map(
        ([folders, status, error]): FoldersListVM => ({
          folders: folders || [],
          status: status || 'init',
          error: error?.message || null,
        }),
      ),
    );
  }

  onDeleteFolder(folder: Folder): void {
    const dialogRef = this.confirmDialogService.open({
      title: 'Подтверждение удаления',
      content: `Вы уверены, что хотите удалить папку "${folder.title}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
      secondaryButtonText: 'Отмена',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(() => {
          this.foldersFacade.deleteFolder(folder.id);
        }),
      )
      .subscribe();
  }

  onOpenFolder(id: number): void {
    this.router.navigate(['/materials', id]);
  }

  private setupActionListeners(): void {
    this.actions$
      .pipe(
        ofType(FoldersActions.deleteFolderSuccess, FoldersActions.deleteFolderFailure),
        takeUntilDestroyed(this.destroyRef),
        tap((action) => {
          if (action.type === FoldersActions.deleteFolderSuccess.type) {
            this.snackBar.open('Папка успешно удалена', 'Закрыть', { duration: 3000 });
          } else {
            const errorAction = action as ReturnType<typeof FoldersActions.deleteFolderFailure>;
            this.snackBar.open(`Ошибка при удалении папки: ${errorAction.error.message}`, 'Закрыть', {
              duration: 5000,
            });
          }
        }),
      )
      .subscribe();
  }
}
