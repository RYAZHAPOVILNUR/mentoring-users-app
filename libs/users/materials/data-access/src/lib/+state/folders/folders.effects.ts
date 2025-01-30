import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { switchMap, catchError, of, map } from 'rxjs';
import { foldersDTOAdapter } from '../../models/folders-dto.adapter';
import { FoldersDTO } from '../../models/folders-dto.model';
import * as FoldersActions from './folders.actions';


export const foldersEffect = createEffect(
	() => {
		const actions$ = inject(Actions);
		const apiService = inject(ApiService);

		return actions$.pipe(
			ofType(FoldersActions.initFolders),
			switchMap(() => {
				console.log('initFolders action dispatched');
				return apiService.get<FoldersDTO[]>('/folders').pipe(
					map((folders) =>{
						console.log('Folders loaded from API:', folders);
						return FoldersActions.loadFoldersSuccess({
							folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
						})
					}),
					catchError((error) => {
						console.error('Error', error);
						return of(FoldersActions.loadFoldersFailure({ error }))
					})
				)
			})
		)
	},
	{ functional: true }
)
