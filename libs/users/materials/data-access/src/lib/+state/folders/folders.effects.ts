import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { FoldersActions } from './folders.actions';
import * as FoldersFeature from './folders.reducer';
import { foldersDTOAdapter, FoldersDTO, FoldersEntity } from '@users/core/data-access';
import { ApiService } from '@users/core/http';

export class FoldersEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly apiService = inject(ApiService);

  initFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() => {
        return this.apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folders) => {
            return FoldersActions.loadFoldersSuccess({
              folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            });
          }),
          catchError((error) => {
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        );
      })
    )
  );

  addFolder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.addFolder),
        switchMap(({ folderData }) =>
          this.apiService.post<FoldersDTO, FoldersEntity>('/folder', folderData).pipe(
            map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            map((folderEntity) => FoldersActions.addFolderSuccess({ folderData: folderEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.addFolderFailed({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  deleteFolder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.deleteFolder),
        switchMap(({ id }) =>
          this.apiService.delete<FoldersDTO>(`/folder/${id}`).pipe(
            map(() => FoldersActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.deleteFolderFailed({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  // editFolder$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(FoldersActions.editFolder),
  //       withLatestFrom(this.foldersEntities$),
  //       filter(([{ folderData }, foldersEntities]) => Boolean(foldersEntities[folderData.id])),
  //       map(([{ folderData }, foldersEntities]) => ({
  //         folder: {
  //           ...foldersDTOAdapter.entityToDTO(<FoldersEntity>foldersEntities[folderData.id]),
  //           ...folderData,
  //         },
  //       })),
  //       switchMap(({ folder }) =>
  //         this.apiService.post<FoldersDTO, FoldersDTO>(`/folder/${folder.id}`, folder).pipe(
  //           map((folderDto) => ({ folderData: foldersDTOAdapter.DTOtoEntity(folderDto) })),
  //           map(({ folderData }) => FoldersActions.editFolderSuccess({ folderData })),
  //           catchError((error) => {
  //             console.error('Error editing folder', error);
  //             return of(FoldersActions.editFolderFailed({ error }));
  //           })
  //         )
  //       )
  //     );
  //   },
  //   { functional: true }
  // );
}
