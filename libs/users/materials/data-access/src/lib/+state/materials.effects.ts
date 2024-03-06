import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { IAddFolder,IFolder } from '../model/folders-models';


export const loadMaterials = createEffect(
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

export const addMaterial = createEffect(
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


export const deleteMaterial = createEffect(
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