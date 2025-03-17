import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, withLatestFrom, filter } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { AddFolderDTO, FoldersDTO } from '../../folders-dto/folders-dto.models';
import { folderDTOAdapter } from '../../folders-dto/folders-dto.adapter';
import { Store, select } from '@ngrx/store';
import { selectFoldersEntities } from './folders.selectors';
import { FoldersEntity } from '../../folders-dto/folders.entity';

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.loadFoldersSuccess({
              folders: folders.map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiServices = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folderData }) =>
        apiServices.post<FoldersDTO, AddFolderDTO>('/folder', folderData).pipe(
          map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
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

export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    return action$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
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

// export const editFoler = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService$ = inject(ApiService);
//     const folderEntities$ = inject(Store).pipe(select(selectFoldersEntities));

//     return actions$.pipe(
//       ofType(FoldersActions.editFolder),
//       withLatestFrom(folderEntities$),
//       filter(([{ id }, folderEntities]) => Boolean(folderEntities[id])),
//       map(([{ folder, id }, folderEntities]) => ({
//         folder: {
//           ...folderDTOAdapter.EntitytoDTO(<FoldersEntity>folderEntities[id]),
//           title: folder.title,
//           createdAtt: folder.createdAt,
//           id: folder.id,
//         },
//       })),
//       switchMap(({ folder }) =>
//         apiService$.post<FoldersDTO, AddFolderDTO>(`/folder/${folder.id}`, folder).pipe(
//           map((folderData) => ({ folderData })),
//           map(({ folderData }) => FoldersActions.addFolderSuccess({ folderData })),
//           catchError((error) => {
//             console.error('Error', error);
//             return of(FoldersActions.addFolderFailed({ error }));
//           })
//         )
//       )
//     );
//   },
//   { functional: true }
// );
