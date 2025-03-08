import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/material-add.model';

@Injectable()
export class MaterialsEffects {
  // folders
  loadFolders = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);
      return action$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() =>
          apiService.get<IFolder[]>('/folder').pipe(
            map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  
  deleteFolder = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(MaterialsActions.deleteFolder),
        switchMap(({ id }) =>
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() =>
              MaterialsActions.deleteFolderSuccess({ id })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteFolderFailure({ error }))
            })
          )
        )
      )
    }, {functional: true}
  )

  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folder }) =>
          apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
            map((newFolder) =>
              MaterialsActions.addFolderSuccess({ folder: newFolder })
            ),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }))
            })
          )
      ))
    }, {functional: true}
  )

  openFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      const store = inject(Store);

      return actions$.pipe(
        ofType(MaterialsActions.openFolder),
        withLatestFrom(store.select(selectRouteParams)),
        switchMap(([, params]) => {
          return apiService.get<IFolder>(`/folder/${params['id']}`)
          .pipe(
            map((folder) => MaterialsActions.openFolderSuccess({ folder })),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.openFolderFailure({ error }))
            })
          )
        })
      )
    }, {functional: true}
  )

    // materials
    loadMaterials = createEffect(
      () => {
        const action$ = inject(Actions);
        const apiService = inject(ApiService);
        const store = inject(Store);
    
        return action$.pipe(
          ofType(MaterialsActions.loadMaterials),
          withLatestFrom(store.select(selectRouteParams)),
          switchMap(([, params]) =>
            apiService.get<IMaterial[]>('/material').pipe(
              map((materials) => 
                 MaterialsActions.loadMaterialsSuccess({ 
                    materials: materials.filter(
                      (material) => material.folder_id === +params['id']
                    )
                  })
              ),
              catchError((error) => {console.error('Error', error);
              return of(MaterialsActions.loadMaterialsFailure({ error }))
              })
              )
          )
        )
      }, {functional: true}
    )
  
    deleteMaterial = createEffect(
      () => {
        const action$ = inject(Actions);
        const apiService = inject(ApiService);
  
        return action$.pipe(
          ofType(MaterialsActions.deleteMaterial),
          switchMap(({ id }) =>
            apiService.delete<void>(`/material/${id}`).pipe(
              switchMap(() => [
                MaterialsActions.deleteMaterialSuccess({ id }),
                MaterialsActions.loadMaterials()
              ]),
              catchError((error) => {
                console.error('Error', error);
                return of(MaterialsActions.deleteMaterialFailure({ error }))
              })
            )
          )
        )
      }, {functional: true}
    )
  
    addMaterial = createEffect(
      () => {
        const actions$ = inject(Actions);
        const apiService = inject(ApiService);
        const store = inject(Store);
  
        return actions$.pipe(
          ofType(MaterialsActions.addMaterial),
          withLatestFrom(store.select(selectRouteParams)),
          switchMap(([{ material }, params]) => {
            const folderId = Number(params['id']);
  
            const materialWithFolderId: IAddMaterial = {
              title: material.title,
              material_link: material.material_link,
              folder_id: folderId
            }
  
            return apiService.post<IMaterial, IAddMaterial>('/material', materialWithFolderId).pipe(
              map((newMaterial) =>
                MaterialsActions.addMaterialSuccess({ material: newMaterial })
              ),
              catchError((error) => {
                console.log('Error', error);
                return of(MaterialsActions.addMaterialFailure({ error }))
              })
            )}
        ))
      }, {functional: true}
    )
}
