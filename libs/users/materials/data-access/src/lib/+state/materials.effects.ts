import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { IAddFolder,IAddMaterial,IFolder, IMaterial } from '../model/folders-models';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';


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

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{material}, {id}]) => {
        const folderId = Number(id);
        
        const materialWithFolderId:IAddMaterial = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId,
        };

        return apiService.post<IMaterial, IAddMaterial>('/material', materialWithFolderId).pipe(
          map(newMaterial => 
            MaterialsActions.addMaterialSuccess({ material: newMaterial })
          ),
          catchError(() => 
            of(MaterialsActions.addMaterialFailed())
          )
        );
      })
    );
  },
  { functional: true }
);


export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(
        ({ id }) => {
          return apiService
            .delete<void>(`/material/${id}`)
            .pipe(
              map(() => {
                return MaterialsActions.deleteMaterialSuccess({id});
              }
            )
          );
      })
    )
  },{ functional:true }
)
