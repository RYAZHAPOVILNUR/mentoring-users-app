import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, withLatestFrom } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { FoldersDTO } from '../../folders-dto/folders-dto.models';
import { folderDTOAdapter } from '../../folders-dto/folders-dto.adapter';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

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

// export const loadFolder = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(ApiService);
//     const store = inject(Store);
//     return actions$.pipe(
//       ofType(FoldersActions.loadFolder),
//       withLatestFrom(store.select(selectRouteParams)),
//       switchMap(([, params]) => {
//         console.log('Params Folder>>>', params['id']);
//         if (params['id']) {
//           return apiService.get<FoldersDTO>(`/folder/${params['id']}`).pipe(
//             map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
//             map((folderEntity) => FoldersActions.loadFolderSuccess({ folderData: folderEntity })),
//             catchError((error) => {
//               console.error('Error', error);
//               return of(FoldersActions.loadFolderFailed({ error }));
//             })
//           );
//         }
//         return of(FoldersActions.updateFolderStatus({ status: 'loading' }));
//       })
//     );
//   },
//   { functional: true }
// );
