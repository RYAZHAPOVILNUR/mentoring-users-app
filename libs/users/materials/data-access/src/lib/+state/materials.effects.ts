import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { CreateFolderDTO, FolderDTO, FolderEntity, foldersDTOAdapter } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { Store, select } from '@ngrx/store';
import { selectFoldersEntities } from './materials.selectors';
  
export class MaterialsEffects {
  init$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.initFolders),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders) =>
            MaterialsActions.loadFoldersSuccess({
              folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  }, {functional: true});
  
  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folderData }) =>
          apiService.post<FolderDTO, CreateFolderDTO>('/folder', folderData).pipe(
            map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            map((folderEntity) => MaterialsActions.addFolderSuccess({ folderData: folderEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
  
  editFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const foldersEntities$ = inject(Store).pipe(select(selectFoldersEntities));
  
    return actions$.pipe(
      ofType(MaterialsActions.editFolder),
      withLatestFrom(foldersEntities$),
      filter(([{ id }, folderEntities]) => Boolean(!!folderEntities[id])),
      switchMap(([{ folderData, id, onSuccess }, folderEntities]) =>
        apiService.post<FolderDTO, CreateFolderDTO>(`/folder/${id}`, {
          ...foldersDTOAdapter.entityToDTO(<FolderEntity>folderEntities[id]) as FolderEntity,
          title: folderData.title,
          created_at: folderData.created_at,
        }).pipe(
          tap(() => onSuccess?.()),
          map(folderData => MaterialsActions.editFolderSuccess({ folderData })),
          catchError(error => {
            console.error('Error editing folder:', error);
            return of(MaterialsActions.editFolderFailure({ error }));
          })
        )
      )
    );
  }, { functional: true });
  
  deleteFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(MaterialsActions.deleteFolder),
        switchMap(({ id }) =>
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() => MaterialsActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteFolderFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
}
