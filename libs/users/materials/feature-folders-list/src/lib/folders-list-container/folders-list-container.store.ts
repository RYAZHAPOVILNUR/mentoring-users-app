import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersEntity, FoldersFacade, FoldersVM } from '@users/materials/data-access';
import { tap } from 'rxjs';

type FoldersListState = {
  folders: FoldersVM[];
};

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => [...folders].sort((a, b) => a.created_at - b.created_at));
  public readonly status$ = this.select(this.foldersFacade.folderStatus$, (status) => status);
  public errors$ = this.select(this.foldersFacade.folderError$, (error) => error);

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
    this.patchState({ folders });
  }

  public deleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}?` },
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
