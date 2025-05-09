import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import { FoldersActions } from "./folders.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { FoldersType } from "../../models/folder.type";

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
  
}