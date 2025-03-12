import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeepReadonly } from '@users/core/utils';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersEntity } from '@users/core/data-access';
import { foldersVmAdapter } from '../../../../folders-vm.adapter';
import { FoldersVm } from '../../../../folders-vm';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '@users/materials/feature-folders-create';

export type FoldersListState = DeepReadonly<{
  folders: FoldersVm[];
}>

const initialState: FoldersListState = {
  folders: []
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  public readonly folders$ = this.select(({ folders }) => folders);
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly status$ = this.select(
    this.foldersFacade.status$,
    (status) => status
  );
  public errors$ = this.select(this.foldersFacade.errors$, (error) => error);
  private readonly dialog = inject(MatDialog);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  public deleteFolder(folderId: number, folderTitle: string): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить "${folderTitle}"` }
    });
    this.effect(
      () => dialogRef.afterClosed().pipe(
        tap(
          (result: boolean) => {
            if (result) this.foldersFacade.deleteFolder(folderId);
          }
        )
      )
    );
  }

  public editFolder(folder: FoldersEntity): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: {
        dialogText: `Переименовать`,
        folderData: folder
      }
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((formData: FoldersEntity) => {
          if (formData) this.foldersFacade.editFolder(formData);
        })
      )
    );
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(
      () => this.foldersFacade.allFolders$.pipe(
        tap((folders: FoldersEntity[]) => this.patchFolders(folders))
      )
    );
  }

  private patchFolders(folders: FoldersEntity[]): void {
    this.patchState({
      folders: folders.map(
        folder => foldersVmAdapter.entityToVm(folder)
      )
    });
  }
}
