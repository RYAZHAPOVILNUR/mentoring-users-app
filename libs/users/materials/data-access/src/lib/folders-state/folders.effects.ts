import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import {FoldersEntity} from './folders.models'
import { map } from 'rxjs/operators';
import {CreateFolderDTO} from "../models/folders-dto.models"


export const initFolders = createEffect(() =>{
    const httpService = inject(ApiService)
    const actions$ = inject(Actions)
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        httpService.get<FoldersEntity[]>('/folder').pipe(
          map((data) => FoldersActions.loadFoldersSuccess({ folders: data })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  }, { functional: true });

  export const addFolder = createEffect(()=>{
    const httpService = inject(ApiService)
    const actions$ = inject(Actions)
    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({title}) =>
        httpService.post<FoldersEntity ,CreateFolderDTO>('/folder',
          {title: title}).pipe(
            map((folder)=>{
             return FoldersActions.addFolderSuccess({folder})
            }),
          catchError((error)=>{
            return of(FoldersActions.addFolderFailure({ error }));
            }
          )
        )

      )
    )
  }, { functional: true });

export const deleteFolder = createEffect(()=>{
  const httpService = inject(ApiService)
  const actions$ = inject(Actions)
  return actions$.pipe(
    ofType(FoldersActions.deleteFolder),
    switchMap(({id}) =>
      httpService.delete(`/folder/${id}`).pipe(
        map(()=>
        FoldersActions.deleteFolderSuccess({id})),
        catchError((error)=>{
          return of(FoldersActions.deleteFolderFailure({ error }));
        })
      ),
    )
  )
}, {functional: true });
