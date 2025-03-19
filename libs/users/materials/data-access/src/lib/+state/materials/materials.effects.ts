import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, switchMap, map, of, withLatestFrom } from 'rxjs';
import { MaterialsDTO } from '../../materials-dto/materials-dto.models';
import { materialsDTOAdapter } from '../../materials-dto/materials-dto.adapter';
import * as MaterialsActions from './materials.actions';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>(`/material`).pipe(
          map((materials) => {
            return MaterialsActions.loadMaterialsSuccess({
              materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

//===============
// получается запрос на апи не делаю, если в стэйте нет фолдеров, беру их
// (через foldersEnteties) и отправляю экшен
// (условно: initFoldersFromMaterials({ foldersEnteties })) ?
//===============
// ofType(MatererialsActions.loadMaterials),
// withLatestFrom(store.select(selectFoldersEnteties)),
// filter(([, foldersEnteties]) => !Object.keys(foldersEnteties).length),
// switchMap(([, foldersEnteties]) => {
//   return apiService.get<TFolderDTO[]>('/folder').pipe(
//     map((folders) =>
//       MaterialsFoldersActions.loadFolderSuccess({
//         folders: folders.map((folder) => folderDtoAdapter.DTOtoEntity(folder)),
//       })
//     ),
//     catchError((error) => {
//       console.log('Error', error);
//       return of(MaterialsFoldersActions.loadFolderFailure({ error }));
//     })
//   );
// })
