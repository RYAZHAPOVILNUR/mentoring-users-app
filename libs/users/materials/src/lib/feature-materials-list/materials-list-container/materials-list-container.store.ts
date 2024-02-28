import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ApiService } from '@users/core/http';
import {
  catchError,
  of,
  tap,
  filter,
  map,
  concatMap,
  switchMap,
  first,
} from 'rxjs';
import {
  Material,
  FolderVM,
  MaterialPostRequest,
} from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';

interface TypeInitialState {
  materials: Material[];
  folder: FolderVM;
  isLoading: boolean | null;
  error: null | string;
}

const initialState: TypeInitialState = {
  materials: [],
  isLoading: null,
  error: null,
  folder: {
    title: '',
    id: 0,
    created_at: 0,
  },
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<TypeInitialState> {
  readonly apiUrl = inject(ApiService);
  public readonly materials$ = this.select((state) => state.materials);
  public readonly folderTitle$ = this.select((state) => state.folder.title);
  public readonly folder$ = this.select((state) => state.folder);
  public readonly isLoading$ = this.select((state) => state.isLoading);

  constructor() {
    super(initialState);
  }

  public loadMaterials(id: number) {
    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));

    this.effect(() =>
      this.apiUrl.get<Material[]>('/material').pipe(
        first(),
        map((materials) => materials.filter((m) => m.folder_id == id)),
        tap((materials) => {
          this.patchState((state) => ({
            ...state,
            isLoading: false,
            materials,
          }));
        }),
        catchError((error) => {
          return of(
            this.patchState((state) => ({
              ...state,
              isLoading: false,
              error,
            }))
          );
        })
      )
    );
  }

  public postMaterial(data: MaterialPostRequest) {
    const newMaterial = {
      ...data,
      folder_id: 0,
    };

    this.folder$
      .pipe(tap((folder) => (newMaterial.folder_id = folder.id)))
      .subscribe();

    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));
    this.effect(() =>
      this.apiUrl
        .post<Material, MaterialPostRequest>('/material', newMaterial)
        .pipe(
          first(),
          tap((material) => {
            this.patchState((state) => ({
              ...state,
              isLoading: false,
              materials: [...state.materials, material],
            }));
          }),
          catchError((error) => {
            return of(
              this.patchState((state) => ({
                ...state,
                isLoading: false,
                error,
              }))
            );
          })
        )
    );
  }

  public loadFolder(id: number) {
    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));

    this.effect(() =>
      this.apiUrl.get<FolderVM>('/folder/' + id).pipe(
        first(),
        tap((folder) => {
          this.patchState((state) => ({
            ...state,
            isLoading: false,
            folder,
          }));
        }),
        catchError((error) => {
          return of(
            this.patchState((state) => ({
              ...state,
              isLoading: false,
              error,
            }))
          );
        })
      )
    );
  }

  public deleteMaterial(id: number) {
    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));

    this.effect(() =>
      this.apiUrl.delete<Material[]>('/material/' + id).pipe(
        first(),
        tap(() => {
          this.patchState((state) => ({
            ...state,
            isLoading: false,
            materials: state.materials.filter(
              (materials) => materials.id !== id
            ),
          }));
        }),
        catchError((error) => {
          return of(
            this.patchState((state) => ({
              ...state,
              isLoading: false,
              error,
            }))
          );
        })
      )
    );
  }
}
