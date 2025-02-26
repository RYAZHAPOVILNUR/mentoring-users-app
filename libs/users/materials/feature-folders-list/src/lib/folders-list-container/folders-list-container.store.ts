import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { SharedFacade } from '../../../../data-access/src/lib/+state/sharedFacade';
import { FoldersEntity } from '../../../../data-access/src/lib/models/folders.entity';
import { FoldersVM } from '../../../../folders-vm';

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly facadeF = inject(SharedFacade);
  private readonly dialog = inject(MatDialog);
  public readonly status$ = this.select(this.facadeF.statusFolders$, (status) => status);
  public readonly errors$ = this.select(this.facadeF.errorsFolders$, (error) => error);

  constructor() {
    super(initialState);
    this.facadeF.initFolders();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.facadeF.allFolders$.pipe(
      tap((folders: FoldersEntity[]) => this.patchFolders(folders))
    ));
  }

  private patchFolders(folders: FoldersEntity[]): void {
    this.patchState({ folders });
  }

  public confirmDeleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${ folder.title }?`},
    });
      this.effect(() =>
    dialogRef.afterClosed().pipe(
      tap((result: boolean) => {
        if (result) this.facadeF.deleteFolder(folder.id);
      })
    ));
  }

}
