import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { foldersFacade } from 'libs/users/materials/data-access/src';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folders.type';
import { tap } from 'rxjs';
import { foldersVMAdapter } from '../../../../view-models/folders-vm.adapter';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

type FoldersListState = DeepReadonly<{
  folders: FoldersType[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(foldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.foldersStatus$, (status) => status);
  public readonly errors$ = this.select(this.foldersFacade.foldersError$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FoldersType[]) => this.patchFolders(folders))));
  }

  private patchFolders(folders: FoldersType[]): void {
    this.patchState({
      folders: folders.map((folder) => foldersVMAdapter.entityToVM(folder)),
    });
  }

  public deleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку "${folder.title}"?` },
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
