import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '@users/core/http';
import * as ActionsFolder from './materials.actions';
import { Folder, Material, MaterialRes } from '../interfaces';


export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe( 
      ofType(ActionsFolder.loadFolders),
      switchMap(() => 
        apiSrvice.get<Folder[]>('/folder').
        pipe(
          map((folders: Folder[]) => ActionsFolder.loadFoldersSucces({folders: folders}))
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
        apiSrvice.delete<Folder[]>(`/folder/${id}`).pipe(
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
        apiSrvice.delete<Material[]>(`/material/${id}`).pipe(
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
        apiSrvice.post<Folder, {title: string}>('/folder', {title}).pipe(
          map((folder) => ActionsFolder.addFolderSucces({folder}))
        )
      )
    )
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
        apiSrvice.post<Material, MaterialRes>('/material', res).pipe(
          map((mat) => ActionsFolder.addMatSucces({mat}))
        )
      )
    )
  },
  {functional: true}
);

export const loadFoldreId = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.loadFolderId),
      switchMap(({id}) => 
        apiSrvice.get<Folder>(`/folder/${id}`).pipe(
          map((folder) => ActionsFolder.loadFolderIdSucces({folder}))
        )
      )
    )
  },
  {functional: true}
);

export const loadMats = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiSrvice = inject(ApiService);
    return actions$.pipe(
      ofType(ActionsFolder.loadMat),
      switchMap(() => 
        apiSrvice.get<Material[]>('/material').pipe(
          map((mats) => ActionsFolder.loadMatSucces({mats}))
        )
      )
    )
  },
  {functional: true}
);
