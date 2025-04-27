import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import * as FoldersActions from './folders.actions';
import { catchError, map, of, switchMap } from "rxjs";
import { CreateFoldersDTO, FoldersDTO } from "../../models/folders-dto.model";
import { foldersDTOAdapter } from "../../models/folder.adapter";

@Injectable()
export class FoldersEffects {
  loadFolders = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);
      // action$.subscribe(console.log)
      return action$.pipe(
        ofType(FoldersActions.initFolders),
        switchMap(() =>
          apiService.get<FoldersDTO[]>('/folder').pipe(
            map((folders) =>
              FoldersActions.loadFoldersSuccess({
                folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
              })
            ),
            catchError((error) => {
              return of(FoldersActions.loadFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  deleteFolder = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(FoldersActions.deleteFolder),
        switchMap(({ id }) =>
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() => FoldersActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.deleteFolderFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(FoldersActions.addFolder),
        switchMap(({ folderData }) =>
          apiService.post<FoldersDTO, CreateFoldersDTO>('/folder', folderData).pipe(
            map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            map((folderEntity) => FoldersActions.addFolderSuccess({ folderData: folderEntity })),
            catchError((error) => {
              console.log('Error', error);
              return of(FoldersActions.addFolderFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
}