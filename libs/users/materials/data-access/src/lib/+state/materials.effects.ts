import {
  of,
  map,
  switchMap,
  catchError,
} from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Folder, IAddFolder } from './types/materials.interface';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.getFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.getFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.getFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folderData }) =>
        apiService.post<Folder, IAddFolder>('/folder', folderData).pipe(
          map((newFolder) =>
            MaterialsActions.addFolderSuccess({ folderData: newFolder })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.addFolderFailure({ error }))
          })
        )
      )
    );
  }, { functional: true }
);

// export const materialsEffects = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(ApiService);

//     return actions$.pipe(
//       ofType(MaterialsActions.getMaterials),
//       // delay(1500),
//       switchMap(() =>
//         apiService.get<Material[]>('/material').pipe(
//           map((materials) => MaterialsActions.getMaterialsSuccess({ materials })),
//           catchError((error) => {
//             console.error('Error', error);
//             return of(MaterialsActions.getMaterialsFailure({ error }));
//           })
//         )
//       )
//     );
//   },
//   { functional: true }
// );