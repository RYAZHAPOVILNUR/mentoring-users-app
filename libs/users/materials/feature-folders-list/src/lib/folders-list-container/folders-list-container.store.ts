import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folder.type';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { tap } from 'rxjs';
import { foldersVMAdapter } from '../../../../view-models/folders-vm.adapter';

type FoldersListState = DeepReadonly<{
  folders: FoldersType[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly FoldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.FoldersFacade.foldersStatus$, (status) => status);
  public readonly errors$ = this.select(this.FoldersFacade.foldersError$, (error) => error);

  constructor() {
    super(initialState);
    this.FoldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.FoldersFacade.allFolders$.pipe(tap((folders: FoldersType[]) => this.patchFolders(folders))));
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
      dialogRef.afterClosed().pipe(tap((result: boolean) => result && this.FoldersFacade.deleteFolder(folder.id)))
    );
  }
}