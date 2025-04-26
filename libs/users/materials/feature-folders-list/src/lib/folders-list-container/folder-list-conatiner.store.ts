import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersEntity } from '@users/materials/data-access';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersVM } from '../../../../vm/folders-vm';

type FoldersListState = {
  folders: FoldersVM[];
};

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FolderListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);

  constructor() {
    super(initialState);
    this.foldersFacade.loadFolders();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.foldersFacade.allFolders$.pipe(tap((folders: FoldersEntity[]) => this.patchState({ folders })))
    );
  }

  public deleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title} ?` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.foldersFacade.deleteFolder(folder.id);
        })
      )
    );
  }
}
