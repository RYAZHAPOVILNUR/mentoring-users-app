import { CreateMaterialDTO, MaterialDTO, MaterialEntity, materialsDTOAdapter } from "@users/core/data-access";
import { UserMaterialActions } from "./user-material.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { ApiService } from "@users/core/http";
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { selectMaterialsEntities } from "./user-material.selectors";
import { select, Store } from "@ngrx/store";

export class UserMaterialsEffects {
  init$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UserMaterialActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialEntity[]>('/material').pipe(
          map((materials) =>
            UserMaterialActions.loadMaterialsSuccess({materials})
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UserMaterialActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  }, {functional: true});
  
  addMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(UserMaterialActions.addMaterial),
        // delay(1500),
        switchMap(({ materialData }) =>
          apiService.post<MaterialEntity, CreateMaterialDTO>('/material', materialData).pipe(
            map((materialData) => UserMaterialActions.addMaterialSuccess({ materialData })),
            catchError((error) => {
              console.error('Error', error);
              return of(UserMaterialActions.addMaterialFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
  
  editMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      const materialsEntities$ = inject(Store).pipe(select(selectMaterialsEntities));
  
      return actions$.pipe(
        ofType(UserMaterialActions.editMaterial),
        withLatestFrom(materialsEntities$),
        filter(([{ id }, materialsEntities]) => Boolean(materialsEntities[id])),
        map(([{ materialData, id, onSuccess }, materialsEntities]) => ({
          material: {
            ...materialsDTOAdapter.entityToDTO(<MaterialEntity>materialsEntities[id]),
            name: materialData.name,
            created_at: materialData.created_at,
          },
          onSuccess,
        })),
        switchMap(({ material, onSuccess }) =>
          apiService.post<MaterialEntity, CreateMaterialDTO>(`/material/${material.id}`, material).pipe(
            map((materialData) => ({ materialData, onSuccess })),
            tap(({ onSuccess }) => onSuccess()),
            map(({ materialData }) => UserMaterialActions.editMaterialSuccess({ materialData })),
            catchError((error) => {
              console.error('Error', error);
              return of(UserMaterialActions.editMaterialFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
  
  deleteMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(UserMaterialActions.deleteMaterial),
        // delay(1500),
        switchMap(({ id }) =>
          apiService.delete<void>(`/material/${id}`).pipe(
            map(() => UserMaterialActions.deleteMaterialSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(UserMaterialActions.deleteMaterialFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
}