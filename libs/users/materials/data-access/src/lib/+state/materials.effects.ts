import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { IAddFolder,IFolder, IMaterial } from '../model/folders-models';


export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)

  

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(
        () => apiService.get<IFolder[]>('/folder')
        .pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({folders})),
          catchError(error => {
            console.log(error)
            
            return of(MaterialsActions.loadFoldersFailed())
          })
        )
      )
    )

  },{ functional:true }
)

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(
        ({ folder }) => {
          return apiService
            .post<IFolder, IAddFolder>('/folder', folder)
            .pipe(
              map((newFolder) => {
                return MaterialsActions.addFolderSuccess({ newFolder });
              })
            );
      })
    )
  },{ functional:true }
)


export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(
        ({ id }) => {
          return apiService
            .delete<void>(`/folder/${id}`)
            .pipe(
              map(() => {
                return MaterialsActions.deleteFolderSuccess({id});
              })
            );
      })
    )
  },{ functional:true }
)



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