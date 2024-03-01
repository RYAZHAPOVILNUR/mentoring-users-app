import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { IMaterial } from '../model/material-models';


export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)

  

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(
        () => apiService.get<IMaterial[]>('/material')
        .pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({materials})),
          catchError(error => {
            console.log(error)
            
            return of(MaterialsActions.loadMaterialsFailed())
          })
        )
      )
    )

  },{ functional:true }
)