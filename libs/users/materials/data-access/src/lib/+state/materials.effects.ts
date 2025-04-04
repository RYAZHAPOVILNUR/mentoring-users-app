import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folders.interface';

@Injectable()
export class MaterialsEffects {

  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadFolders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      mergeMap(() => this.apiService.get<Folder[]>('/folder').pipe(
        map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
        catchError((error) => {
          console.log('Error: ', error);
          return of(MaterialsActions.loadFoldersFailure({ error }));
        })
      )
      )
    );
  });
}
