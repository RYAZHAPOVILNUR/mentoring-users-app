// import { Injectable, inject } from '@angular/core';
// import { ComponentStore } from '@ngrx/component-store';
// import { DeepReadonly } from '@users/core/utils';
// import { tap } from 'rxjs';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { FoldersFacade } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.facade';
// import { foldersAdapter } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.reducer';
// import { FoldersDTO } from 'libs/users/materials/data-access/src/lib/+state/models/models';


// type FolderersListState = DeepReadonly<{
//   folders: FoldersDTO[];
// }>;

// const initialState: FolderersListState = {
//   folders: [],
// };

// @Injectable()
// export class FoldersListContainerStore extends ComponentStore<FolderersListState> {
//   private readonly foldersFacade = inject(FoldersFacade);
//   private readonly dialog = inject(MatDialog);
//   public readonly folders$ = this.select(({ folders }) => folders);
//   public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
//   public errors$ = this.select(this.foldersFacade.errors$, (error) => error);


//   constructor() {
//     super(initialState);
//     this.foldersFacade.loadFolders();
//     this.setFoldersFromGlobalToLocalStore();
//   }

//   private setFoldersFromGlobalToLocalStore(): void {
//     this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FoldersDTO[]) => this.patchFolders(folders))));
//   }

//   private patchFolders(folders: FoldersDTO[]): void {
//     this.patchState(folders)
//   }
// }

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
