import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap, startWith } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateMaterialDTO, MaterialDTO } from '../../models/materials.models';
import { select, Store } from '@ngrx/store';
import { selectMaterialsEntities } from './materials.selectors';
import { selectRouteParams } from '@users/core/data-access';

export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);  

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      // delay(1500),
      switchMap(() =>
        apiService.get<MaterialDTO[]>('/material').pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({materials})
          ),
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

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store); // Нужно добавить store для доступа к хранилищу
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)), // взять последние значения из хранилища (в данном случае параметры маршрута), которые будут использоваться для добавления folderId в запрос
      switchMap(([{ material }, params]) => {
        const folderId = params['id']; // Извлекаем folderId из параметров маршрута
        const materialWithFolder = { ...material, folder_id: folderId }; //добавляем или обновляем поле folder_id в объекте material, создавая новый объект materialWithFolder
        return apiService.post<MaterialDTO, CreateMaterialDTO>('/material', materialWithFolder).pipe( //отправляем materialWithFolder в запросе POST, что позволяет передать как сам материал, так и folderId
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
            catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        )
      })
    );
  },
  { functional: true }
);

