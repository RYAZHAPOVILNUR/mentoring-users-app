import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import { FoldersActions } from "./materials.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Folder } from "../models/folder.model";

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>("/folder").pipe(
          map(folders => FoldersActions.loadFoldersSuccess({folders})),
          catchError(error => of(FoldersActions.loadFoldersFailure(error))),
        )
      )
    )
  },
  { functional: true }
)

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolder),
      switchMap(({folder}) =>
        apiService.post<Folder, Folder>("/folder", folder).pipe(
          map((folder) => FoldersActions.loadFolderSuccess({folder})),
          catchError((error) => of(FoldersActions.loadFolderFailure(error)))
        )
      )
    )
  },
  { functional: true }
)