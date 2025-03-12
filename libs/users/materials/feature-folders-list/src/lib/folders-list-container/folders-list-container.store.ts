import { DeepReadonly } from '@users/core/utils';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FoldersFacade, MaterialsFacade } from '@users/materials/data-access';
import { shareReplay, tap } from 'rxjs';
import { FoldersDTO } from '@users/core/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

type FoldersListState = DeepReadonly<{
  folders: FoldersDTO[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly materialFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
  public errors$ = this.select(this.foldersFacade.error$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.materialFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap(( folders: FoldersDTO[] ) => this.patchState({folders: folders})),shareReplay(1)));
  }

  public deleteFolder( folder: FoldersDTO ): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${ folder.title }` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap(( result: boolean ) => {
          if (result) this.foldersFacade.deleteFolder(+folder.id);
        })
      )
    );
  }
}
