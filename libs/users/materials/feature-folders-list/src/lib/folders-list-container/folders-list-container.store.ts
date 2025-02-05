import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { ApiService } from '@users/core/http';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { catchError, of, switchMap, tap } from 'rxjs';
import { foldersDTOAdapter } from '../../../../data-access/src/lib/models/folders-dto.adapter';
import { FoldersDTO } from '../../../../data-access/src/lib/models/folders-dto.model';
import { FoldersVM } from '../../../../folders-vm';

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown
};

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;

const initialState: FoldersListState = {
  folders: [],
  status: 'init',
  errors: null
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);

  public readonly folders$ = this.select(
    ({ folders }) => folders);
  public readonly status$ = this.select(
    ({ status }) => status);
  public readonly errors$ = this.select(
    ({ errors }) => errors);

  constructor() {
    super(initialState);
  }

  readonly loadFolders = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.patchState({ status: 'loading', errors: null });
      }),
      switchMap(() =>
        this.api.get<FoldersDTO[]>('/folder').pipe(
          tap((foldersDTO) => {
            const folders = foldersDTO.map(foldersDTOAdapter.DTOtoEntity);
            this.patchState({ folders, status: 'loaded', errors: null });
          }),
          catchError((error: FoldersErrors) => {
            this.patchState({ status: 'error', errors: error });
            return of([]);
          })
        )
      )
    )
  );

  readonly deleteFolder = this.effect<FoldersVM>((folder$) =>
    folder$.pipe(
      switchMap((folder) =>
        this.api.delete<void>(`/folder/${folder.id}`).pipe(
          tap(() => {
            console.log(`Folder with id ${folder.id} deleted`);
            this.patchState((state) => ({
              folders: state.folders.filter((f) => f.id !== folder.id),
            }));
          }),
          catchError((error) => {
            console.error('Error deleting folder', error);
            return [];
          })
        )
      )
    )
  );

  public confirmDeleteFolder(folder: FoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${ folder.title }?`},
    });
      this.effect(() =>
    dialogRef.afterClosed().pipe(
      tap((result: boolean) => {
        if (result) this.deleteFolder(folder);
      })
    ));
  }

}
