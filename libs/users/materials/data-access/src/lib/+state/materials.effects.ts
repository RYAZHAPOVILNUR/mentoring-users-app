import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '@users/core/http';
import * as ActionsFolder from './materials.actions';
import { Folder, Mat, MatRes } from './interfaces';


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

export const deleteMat = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.deleteMat),
      switchMap(({id}) => 
      apiSrvice.delete<Mat[]>(`/material/${id}`)
      .pipe(
        map(() => ActionsFolder.deleteMatSucces({id}))
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
);

export const addMat = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.addMat),
      switchMap(({res}) => 
      apiSrvice.post<Mat, MatRes>('/material', res)
      .pipe(
        map((mat) => ActionsFolder.addMatSucces({mat})
      ))
    ))
  },
  {functional: true}
);

export const getFoldreId = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.getFolderId),
      switchMap(({id}) => 
      apiSrvice.get<Folder>(`/folder/${id}`)
      .pipe(
        map((folder) => ActionsFolder.getFolderIdSucces({folder}))
      )
      )
    )
  },
  {functional: true}
);

export const getMats = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.getMat),
      switchMap(() => 
      apiSrvice.get<Mat[]>('/material')
      .pipe(
        map((mats) => ActionsFolder.getMatSucces({mats}))
      )
      )
    )
  },
  {functional: true}
);
