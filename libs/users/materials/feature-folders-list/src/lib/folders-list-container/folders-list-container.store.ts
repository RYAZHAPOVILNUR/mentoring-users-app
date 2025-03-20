import { foldersFacade, IFolder, FolderVM } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersVmAdapter } from '@users/materials/data-access';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';

type FoldersListState = DeepReadonly<{
  folder: IFolder[];
}>;

const initialState: FoldersListState = {
  folder: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  public readonly foldersFacade = inject(foldersFacade);
  private readonly dialog = inject(MatDialog);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly foldersStatus$ = this.select(this.foldersFacade.foldersStatus$, (status) => status);
  public readonly foldersErrors$ = this.select(this.foldersFacade.foldersErrors$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.loadFolders();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folder: FolderVM[]) => this.patchFolders(folder))));
  }

  private patchFolders(folder: FolderVM[]): void {
    this.patchState({
      folder: folder.map((folder) => FoldersVmAdapter.entityToVM(folder)),
    });
  }

  public onDeleteFolder(folder: IFolder) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку "${folder.title}"?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.foldersFacade.deleteFolder(folder.id);
      }
    });
  }
}
