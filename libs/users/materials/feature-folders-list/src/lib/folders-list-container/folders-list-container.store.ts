import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { Folder, MaterialsFacade } from '@users/users/materials/data-access';
import { filter, tap } from 'rxjs';

type FoldersListContainerState = DeepReadonly<{
  folders: Folder[];
}>;

const initialState: FoldersListContainerState = {
  folders: [],
};

type DeleteDialogRef = MatDialogRef<CoreUiConfirmDialogComponent, boolean>;

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);

  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(
    this.materialsFacade.foldersStatus$, (status) => status
  );
  public readonly error$ = this.select(
    this.materialsFacade.foldersError$, (error) => error
  );

  constructor() {
    super(initialState);
    this.materialsFacade.loadFolders();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(
      () => this.materialsFacade.allFolders$.pipe(
        tap((folders: Folder[]) => this.patchState({ folders })),
      )
    );
  }

  public deleteFolder(folder: Folder) {
    const dialogRef: DeleteDialogRef = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}?` } }
    );
    this.effect(() => 
      dialogRef.afterClosed().pipe(
        filter(Boolean),
        tap(() => this.materialsFacade.deleteFolder(folder.id))
      )
    )
  }
}
