import { DeepReadonly } from '@users/core/utils';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FoldersVM } from '../../../../folders-vm';
import { UsersVM } from '../../../../../users/users-vm';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { tap } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders.facade';
import { UsersEntity } from '@users/core/data-access';
import { FoldersModel } from '../../../../folders-model';
import { usersVMAdapter } from '../../../../../users/users-vm.adapter';
import { foldersVMAdapter } from '../../../folders-vm.adapter';

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FoldersModel[]) => this.patchFolders(folders))));
  }

  private patchFolders(folders: FoldersModel[]): void {
    this.patchState({
      folders: folders.map((folders) => foldersVMAdapter.entityToVM(folders)),
    });
  }

  public deleteFolder(folders: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folders.title}` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.foldersFacade.deleteFolder(folders.id);
        })
      )
    );
  }
}
