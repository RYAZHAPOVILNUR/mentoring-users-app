import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ApiService } from '@users/core/http';
import { catchError, of, tap, filter, map, concatMap, switchMap } from "rxjs";
import { typeMaterial, typeFolderVM, typeMaterialPostRequest } from "../../../../data-access/src/lib/folders-materials-types/folders-materials-types";

interface typeInitialState {
	materials: typeMaterial[],
	folder: typeFolderVM, 
	isLoading: boolean | null,
	error: null | string,
}

const initialState: typeInitialState = {
	materials: [],
	isLoading: null,
	error: null,
	folder: {
		title:'',
		id: 0,
		created_at: 0,
	}
} 

@Injectable()
export class MaterialsListContainerStore extends ComponentStore< typeInitialState >{
	readonly apiUrl = inject(ApiService);
	public readonly materials$ = this.select(( state ) => state.materials);
	public readonly folderTitle$ = this.select(( state ) => state.folder.title);
	public readonly folder$ = this.select(( state ) => state.folder);
	public readonly isLoading$ = this.select(( state ) => state.isLoading);

	constructor(){
		super(initialState);
	}

	public loadMaterials(id: number) {
		this.patchState( state => ({
			...state,
			isLoading: true
		}))
		
		this.effect(() => this.apiUrl.get<typeMaterial[]>('/material').pipe(
				map(materials => materials.filter(m => m.folder_id == id)),
				tap(
					( materials ) => {
						this.patchState( state =>({
							...state,
							isLoading: false,
							materials,
						}))
					}
				),
				catchError((error) => {
					return of ( this.patchState( state =>({
						...state,
						isLoading: false,
						error,
					})))
				})
			)
		)
	}

	public postMaterial(data: typeMaterialPostRequest) {
		const newMaterial = {
			...data,
			folder_id: 0 
		}
		this.folder$.subscribe( folder => newMaterial.folder_id = folder.id);
		this.patchState( state => ({
			...state,
			isLoading: true
		}))
		this.effect(() => this.apiUrl.post<typeMaterial, typeMaterialPostRequest>('/material', newMaterial).pipe(
			tap(
				( material ) => {
					this.patchState( state => ({
						...state,
						isLoading: false,
						materials: [ ...state.materials, material ] 
					}))
				}
			),
			catchError((error) => {
				return of(this.patchState(state => ({
					...state,
					isLoading: false,
					error,
				})))
			})
			)
		)
	}

	public loadFolder(id: number) {
		this.patchState( state => ({
			...state,
			isLoading: true
		}))

		this.effect(() => this.apiUrl.get<typeFolderVM>('/folder/' + id).pipe(
				tap(
					( folder ) => {
						this.patchState( state => ({
							...state,
							isLoading: false,
							folder
						}))
					}
				),
				catchError((error) => {
					return of ( this.patchState( state =>({
						...state,
						isLoading: false,
						error
					})))
				})
			)
		)
	}

	public deleteMaterial(id: number) {
		this.patchState(state => ({
			...state,
			isLoading: true
		}))

		this.effect(() => this.apiUrl.delete<typeMaterial[]>('/material/' + id).pipe(
			tap(
				() => {
					this.patchState(state => ({
						...state,
						isLoading: false,
						materials: state.materials.filter(materials => materials.id !== id)
					}))
				}
			),
			catchError((error) => {
				return of(this.patchState(state => ({
					...state,
					isLoading: false,
					error,
				})))
			})
		)
		)
	}
}