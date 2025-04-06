import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder, newFolder } from '../models/folders.interface';

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

  createFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.createFolder),
      switchMap((action) => 
        this.apiService.post<Folder, newFolder>('/folder', action.folder).pipe(
          map((createdFolder) => 
            MaterialsActions.createFolderSuccess({ folder: createdFolder })
          ),
          catchError((error) => 
            of(MaterialsActions.createFolderFailure({ error }))
          )
        )
      )
    );
  });
}
