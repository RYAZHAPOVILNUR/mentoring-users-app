import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, exhaustMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { IAddFolder } from '../models/add-folder.model';
import { IFolder } from '../models/folder.model';
import { ApiService } from 'libs/core/http/src/lib/api.service';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/add-material.model';

@Injectable()
export class MaterialsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  addFolders = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        this.apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          map((newFolder) => MaterialsActions.addFolderSuccess({ folder: newFolder })),
          catchError((error) => {
            console.log('error', error);
            return of(MaterialsActions.addFolderFailure({ error }));
          })
        )
      )
    );
  });

  loadFolders = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        exhaustMap(() =>
          this.apiService.get<IFolder[]>('/folder').pipe(
            map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
            catchError((error) => {
              return of(MaterialsActions.loadFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  deleteFolders = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.deleteFolders),
        switchMap(({ id }) =>
          this.apiService.delete(`/folder/${id}`).pipe(
            map(() => MaterialsActions.deleteFoldersSuccess({ id })),
            catchError((error) => {
              return of(MaterialsActions.deleteFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  openFolder = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.openFolder),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return this.apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
          map((folder) => MaterialsActions.openFolderSuccess({ folder })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.openFolderFailure({ error }));
          })
        );
      })
    );
  });

  deleteMaterial = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.deleteMaterials),
        switchMap(({ id }) =>
          this.apiService.delete<void>(`/material/${id}`).pipe(
            switchMap(() => [MaterialsActions.deleteMaterialsSuccess({ id }), MaterialsActions.loadMaterials()]),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteMaterialsFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  addMaterial = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addMaterials),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);

        const materialWithFolderId: IAddMaterial = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId,
        };
        return this.apiService.post<IMaterial, IAddMaterial>('/material', materialWithFolderId).pipe(
          map((newMaterial) => MaterialsActions.addMaterialsSuccess({ material: newMaterial })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.addMaterialsFailure({ error }));
          })
        );
      })
    );
  });

  loadMaterials = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.loadMaterials),
        withLatestFrom(this.store.select(selectRouteParams)),
        switchMap(([, params]) =>
          this.apiService.get<IMaterial[]>('/material').pipe(
            map((material) =>
              MaterialsActions.loadMaterialsSuccess({
                material: material.filter((item) => item.folder_id === +params['id']),
              })
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
}
