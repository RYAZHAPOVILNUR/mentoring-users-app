import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FoldersActions from './materials.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FolderInterface } from '../interfaces/folder.interface';


@Injectable()
export class FoldersEffects {
  private actions$ = inject(Actions)
  private http = inject(HttpClient)

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      mergeMap(() =>
        this.http.get<FolderInterface[]>('https://x8ki-letl-twmt.n7.xano.io/apidoc:RaqAbOVN/folder').pipe(
          map(folders => FoldersActions.loadFoldersSuccess({ folders })),
          catchError(error => of(FoldersActions.loadFoldersFailure())))
      )
    )
  );
}
