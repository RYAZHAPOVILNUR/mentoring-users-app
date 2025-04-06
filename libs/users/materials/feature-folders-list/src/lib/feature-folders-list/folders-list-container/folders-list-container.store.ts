import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { Folder } from '@users/materials/data-access';
import { MaterialsFacade } from '@users/materials/data-access';
import { switchMap, tap } from 'rxjs';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Router } from '@angular/router';

export interface FoldersListContainerState {
  folders: Folder[]
};

const initialState: FoldersListContainerState = {
  folders: []
};

@Injectable({ providedIn: 'root' })
export class FoldersListContainerStore extends ComponentStore<FoldersListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly router = inject(Router);
  public readonly folders$ = this.select(({ folders }) => folders);
  
  constructor() {
    super(initialState);
  }

  readonly loadFolders = this.effect(() =>
    this.materialsFacade.loadFolders().pipe(
      switchMap(() => this.materialsFacade.allFolders),
      tap((folders: Folder[]) => {
        this.setState({ folders });
      })
    )
  );

  public openFolder(folderId: number): void {
    this.materialsFacade.openFolder(folderId)
    this.router.navigate(['/materials', folderId]);
  }

  public deleteFolder(folderId: number): void {
    this.folders$.pipe(
      switchMap(folders => {
        const folder = folders.find(f => f.id === folderId);
        if (folder) {
          const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
            data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title}` },
          });
          return dialogRef.afterClosed();
        }
        return [];
      }),
      tap((result: boolean) => {
        if (result) this.materialsFacade.deleteFolder(folderId);
      })
    ).subscribe();
  }
}
