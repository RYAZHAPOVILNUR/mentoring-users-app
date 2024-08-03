import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { CreateFolder } from '../models/create-folder.model';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() => 
          apiService.get<Folder[]>('/folder').pipe(
            map((folders) => 
              MaterialsActions.loadFoldersSuccess({ folders })
            ),
            catchError((error) => {console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }))
            })
            )
        )
      )
    }, {functional: true}
  );
  addFolder = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folderData }) =>
          apiService.post<Folder, CreateFolder>('/folder', folderData).pipe(
            map((folder) => MaterialsActions.addFolderSuccess({ folderData: folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }));
            })
          )
        )
      )
    }
  )
}