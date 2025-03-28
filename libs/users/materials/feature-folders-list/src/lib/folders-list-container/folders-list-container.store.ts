import { FoldersFacade, TFolder, FolderVM } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersVmAdapter } from '@users/materials/data-access';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type FoldersListState = DeepReadonly<{
  folder: TFolder[];
}>;

const initialState: FoldersListState = {
  folder: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  public readonly FoldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);

  public readonly folders$ = this.FoldersFacade.allFolders$;
  public readonly foldersStatus$ = this.select(this.FoldersFacade.foldersStatus$, (status) => status);
  public readonly foldersErrors$ = this.select(this.FoldersFacade.foldersErrors$, (error) => error);

  constructor() {
    super(initialState);
    this.FoldersFacade.loadFolders();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.FoldersFacade.allFolders$.pipe(tap((folder: FolderVM[]) => this.patchFolders(folder))));
  }

  private patchFolders(folder: FolderVM[]): void {
    this.patchState({
      folder: folder.map((folder) => FoldersVmAdapter.entityToVM(folder)),
    });
  }

  public onDeleteFolder(folder: TFolder) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку "${folder.title}"?` },
    });

    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed())
    .subscribe((result: boolean) => {
      if (result) {
        this.FoldersFacade.deleteFolder(folder.id);
      }
    });
  }
}
