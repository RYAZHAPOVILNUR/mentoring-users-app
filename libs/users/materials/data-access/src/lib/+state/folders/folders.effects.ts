import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { addFolder, addFolderSuccess, deleteFolder, deleteFolderSuccess, emptyActionFolder, loadFolders, loadFoldersFail, loadFoldersSuccess, showAlertFolder } from './folders.actions';
import { ApiService } from '@users/core/http';
import { FolderType } from '@users/settings/data-access';

@Injectable()
export class FoldersEffects {
  constructor(private _snackbar: MatSnackBar) { }

  loadFolders$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(loadFolders),
        switchMap(() =>
          apiService.getMaterials<FolderType[]>('/folder')
            .pipe(
              map((data) => loadFoldersSuccess({ list: data })),
              catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
            )
        )
      )
  }
  )

  addFolder$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(addFolder),
        switchMap((action) =>
          apiService.postMaterials('/folder', action.inputdata)
            .pipe(
              map((data) =>
                addFolderSuccess({ inputdata: data as FolderType })
              ),
              catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
            )
        )
      )
  }
  );

  deleteFolder$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(deleteFolder),
        switchMap((action) =>
          apiService.deleteMaterials('/folder', action.id)
            .pipe(
              map(() => deleteFolderSuccess({ id: action.id })),
              catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
            )
        )
      )
  }
  );

  showalert$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$
      .pipe(
        ofType(showAlertFolder),
        exhaustMap((action) =>
          this.showSnackbarAlert(action.message, action.resptype).afterDismissed()
            .pipe(
              map(() => emptyActionFolder())
            )
        )
      )
  }
  );

  showSnackbarAlert(message: string, resptype = 'fail') {
    const _class = resptype === 'pass' ? 'text-green' : 'text-red';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class]
    });
  }
}
