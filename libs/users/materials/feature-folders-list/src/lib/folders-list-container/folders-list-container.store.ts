import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { FoldersEntity } from '@users/core/data-access';
import { FoldersFacade } from '@libs/users/materials/state';
import { foldersVMAdapter } from '../../../../folders-vm.adapter';
import { FoldersVM } from '../../../../folders-vm';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { EditFoldersDialogComponent } from '@users/materials/feature-folders-edit';

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);

  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
  public readonly errors$ = this.select(this.foldersFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.foldersFacade.allFolders$.pipe(tap((folders: FoldersEntity[]) => this.patchFolders(folders)))
    );
  }

  private patchFolders(folders: FoldersEntity[]): void {
    this.patchState({
      folders: folders.map((folder) => foldersVMAdapter.entityToVM(folder)),
    });
  }

  public deleteFolder(folderId: number, folderTitle: string): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить "${folderTitle}"?` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.foldersFacade.deleteFolder(folderId);
        })
      )
    );
  }

  public editFolder(folder: FoldersEntity): void {
    const dialogRef: MatDialogRef<EditFoldersDialogComponent> = this.dialog.open(EditFoldersDialogComponent, {
      data: {
        dialogText: `Переименовать`,
        folderData: folder,
      },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((formData: FoldersEntity) => {
          if (formData) this.foldersFacade.editFolder(formData);
        })
      )
    );
  }
}
