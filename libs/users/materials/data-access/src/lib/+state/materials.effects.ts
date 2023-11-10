import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../model/folder.model';
import { Router } from '@angular/router';
import { CreateFolder } from '../model/folder-create.model';

export const loadFolders$ = createEffect(
    (actions$= inject(Actions),
    apiService = inject(ApiService)) => {
      return actions$.pipe(
        ofType(MaterialsActions.loadFolder),
        switchMap(
          () => apiService.get<Folder[]>('/folder')
          .pipe(
            map(
              (folders) => MaterialsActions.loadFolderSuccess({folders})
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadFolderFailed({ error }))
            })
          )
        )
      )
    }, { functional: true }
  );

export const createFolder$= createEffect(
  (actions$ = inject(Actions),
  apiService = inject(ApiService),
  router = inject(Router)) =>{
    return actions$.pipe(
      ofType(MaterialsActions.createFolder),
      switchMap(
        ({folder}) => apiService.post<void,CreateFolder>('/folder',folder).pipe(
          tap(() => router.navigate(['/materials'])),
          map(() => MaterialsActions.createFolderSuccess),
          catchError((error)=>{
            console.error('Error',error);
            return of(MaterialsActions.createFolderFailed({error}))
          })
        )
      )
    )
  }, { functional: true, dispatch: false }
)