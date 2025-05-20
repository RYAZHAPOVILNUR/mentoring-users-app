import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import { FoldersActions } from "./folders.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AddFoldersType, FoldersType } from "../../models/folder.type";

export class FoldersEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly apiService = inject(ApiService);

  initFolders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        this.apiService.get<FoldersType[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    )
    },
    { functional: true }
  );
  
  addFolder$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(FoldersActions.addFolder),
        switchMap(({ folder }) =>
          this.apiService.post<FoldersType, AddFoldersType>('/folder', folder).pipe(
            map((folder) => FoldersActions.addFolderSuccess({ folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.addFolderFailed({ error }));
            })
          )
        )
      )
    },
    { functional: true }
    );

     deleteFolder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.deleteFolder),
        switchMap(({ id }) =>
          this.apiService.delete<FoldersType>(`/folder/${id}`).pipe(
            map(() => FoldersActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.deleteFolderFailed({ error }));
            })
          )
        )
      )
    },
    { functional: true }
    );
    
}