import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { foldersVMAdapter } from '../../../../folder-vm.adapter';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FolderEntity } from '@users/core/data-access';
import { FoldersVM } from 'libs/users/materials/folder-vm';
import { MaterialsFacade } from '@users/materials/data-access';

type FolderListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FolderListState = {
  folders: [],
};

@Injectable()
export class FolderListContainerStore extends ComponentStore<FolderListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.materialsFacade.allFolders$.pipe(tap((folders: FolderEntity[]) => this.patchFolders(folders))));
  }

  private patchFolders(folders: FolderEntity[]): void {
    this.patchState({
      folders: folders.map((folder) => foldersVMAdapter.entityToVM(folder)),
    });
  }

  public deleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteFolder(folder.id);
        })
      )
    );
  }
}
