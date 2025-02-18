import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { FoldersDTO } from '../../folders-dto/folders-dto.models';
import { folderDTOAdapter } from '../../folders-dto/folders-dto.adapter';

@Injectable()
export class FoldersEffects {
  foldersEffects = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(FoldersActions.initFolders),
        // delay(1500),
        switchMap(() =>
          apiService.get<FoldersDTO[]>('/folder').pipe(
            map((folders) =>
              FoldersActions.loadFoldersSuccess({
                folders: folders.map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
              })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.loadFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
  // loadFolder = createEffect(
  //   () => {
  //     const actions$ = inject(Actions);
  //     const apiService = inject(ApiService);
  //     const store = inject(Store);
  //     return actions$.pipe(
  //       ofType(FoldersActions.initFolders),
  //       withLatestFrom(store.select(selectRouteParams)),
  //       switchMap(() =>
  //         apiService.get<FoldersDTO[]>('/folder').pipe(
  //           map((folders) =>
  //             FoldersActions.loadFoldersSuccess({
  //               folders: folders.map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
  //             })
  //           ),
  //           catchError((error) => {
  //             console.error('Error', error);
  //             return of(FoldersActions.loadFoldersFailure({ error }));
  //           })
  //         )
  //       )
  //     );
  //   },
  //   { functional: true }
  // );
}
