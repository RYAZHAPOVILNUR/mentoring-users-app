import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaterialService } from '../services/folder.service';
import * as FolderActions from '../folders/folders.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FoldersEffects {
  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.loadFolders),
      mergeMap(() =>
        this.materialService.loadFolders().pipe(
          map(folders => FolderActions.loadFoldersSuccess({ folders })),
          catchError(error => of(FolderActions.loadFoldersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private materialService: MaterialService) {}
}
