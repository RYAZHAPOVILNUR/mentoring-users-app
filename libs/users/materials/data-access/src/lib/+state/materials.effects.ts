import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, OperatorFunction } from 'rxjs';
import { ApiService } from '@users/core/http';
import * as ActionsFolder from './materials.actions';
import { Folder } from './interfaces';


export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.initFolders),
    switchMap(() => 
        apiSrvice.get<Folder[]>('/folder').
        pipe(
          map((folders: Folder[]) => ActionsFolder.getFolders({
            folder: folders
          }))
        )
      )
    )
  },
  {functional: true}
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.deleteFolder),
      switchMap(({id}) => 
      apiSrvice.delete<Folder[]>(`/folder/${id}`)
      .pipe(
        map(() => ActionsFolder.deleteFolderSucces({id}))
      )
      )
    )
  },
  {functional: true}
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.addFolder),
      switchMap(({title}) => 
      apiSrvice.post<Folder, {title: string}>('/folder', {title})
      .pipe(
        map((folder) => ActionsFolder.addFolderSucces({folder})
      ))
    ))
  },
  {functional: true}
)
