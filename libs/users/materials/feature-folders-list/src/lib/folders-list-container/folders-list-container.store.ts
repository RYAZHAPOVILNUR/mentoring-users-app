import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { FoldersEntity } from '@users/core/data-access';
import { FoldersFacade } from '@libs/users/materials/state';
import { foldersVMAdapter } from '../../../../folders-vm.adapter';
import { FoldersVM } from '../../../../folders-vm';

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable({
  providedIn: 'root',
})
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
  public errors$ = this.select(this.foldersFacade.errors$, (error) => error);

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

  // public deleteUser(user: UsersVM): void {
  //   const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
  //     data: { dialogText: `Вы уверены, что хотите удалить ${user.name}` },
  //   });
  //   this.effect(() =>
  //     dialogRef.afterClosed().pipe(
  //       tap((result: boolean) => {
  //         if (result) this.usersFacade.deleteUser(user.id);
  //       })
  //     )
  //   );
  // }

  // public filterUsers(name: string) {
  //   this.usersFacade.filterUsers(name);
  // }
}
