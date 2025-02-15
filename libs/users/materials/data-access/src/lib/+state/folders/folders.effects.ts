import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, withLatestFrom, switchMap } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { FoldersDTO } from '../../models/folders-dto.model';
import { folderDTOAdapter } from '../../models/folders-dto.adapter';

// @Injectable()
// export class MaterialsEffects {
//   loadMaterialss$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(MaterialsActions.loadMaterialss),
//       concatMap(() =>
//         /** An EMPTY observable only emits completion. Replace with your own observable API request */
//         EMPTY.pipe(
//           map((data) => MaterialsActions.loadMaterialssSuccess({ data })),
//           catchError((error) => of(MaterialsActions.loadMaterialssFailure({ error })))
//         )
//       )
//     );
//   });

//   constructor(private actions$: Actions) {}
// }

export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.loadFoldersSuccess({
              folders: folders.map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
