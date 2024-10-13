import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '../../models/loading-status.enum';
import { IFolder } from '../../models/folder.interface';
// import { ApiService } from '@users/core/http';
//
// export const loadMaterials$ = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(ApiService);
//
//     return actions$.pipe(
//       ofType(MaterialsActions.loadFolders),
//       tap(() => console.log('Effect triggered')),
//       switchMap(() =>
//         apiService.get<IFolder[]>('/folder').pipe(
//           tap(() => console.log('API request sent')),
//           tap((folders) => console.log('effect, folders', folders)),
//           map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
//           catchError((error) => {
//             // console.error('Error', error)
//             return of(MaterialsActions.loadFoldersFailure({
//               status: LoadingStatus.Error,
//               error
//             }))})
//         )
//       )
//     );
//   },
//   { functional: true }
// );
//
