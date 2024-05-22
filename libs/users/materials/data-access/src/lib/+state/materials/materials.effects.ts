import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { addMaterial, addMaterialSuccess, deleteMaterial, deleteMaterialSuccess, emptyActionMaterials, loadMaterial, loadMaterialSuccess, loadMaterials, loadMaterialsFail, loadMaterialsSuccess, showAlertMaterials } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialType } from '@users/settings/data-access';


@Injectable()
export class MaterialsEffects {
  constructor(private _snackbar: MatSnackBar) { }

  loadMaterials$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(loadMaterials),
      switchMap(() =>
        apiService.getMaterials<MaterialType[]>('/material')
          .pipe(
            map((data) => loadMaterialsSuccess({ list: data })),
            catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
          )
      )
    )
  }
  );

  loadMaterial$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(loadMaterial),
        switchMap((action) =>
          apiService.getMaterials<MaterialType>('/material/' + action.id)
            .pipe(
              map((data) => loadMaterialSuccess({ list: data as MaterialType })),
              catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
            )
        )
      )
  }
  );

  addMaterial$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(addMaterial),
        switchMap((action) =>
          apiService.postMaterials('/material', action.inputdata)
            .pipe(
              map((data) =>
                addMaterialSuccess({ inputdata: data as MaterialType })
              ),
              catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
            )
        )
      )
  }
  );

  deleteMaterial$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$
      .pipe(
        ofType(deleteMaterial),
        switchMap((action) =>
          apiService.deleteMaterials('/material', action.id)
            .pipe(
              map(() => deleteMaterialSuccess({ id: action.id })),
              catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
            )
        )
      )
  }
  );

  showalert$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$
      .pipe(
        ofType(showAlertMaterials),
        exhaustMap((action) =>
          this.showSnackbarAlert(action.message, action.resptype).afterDismissed()
            .pipe(
              map(() => emptyActionMaterials())
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
