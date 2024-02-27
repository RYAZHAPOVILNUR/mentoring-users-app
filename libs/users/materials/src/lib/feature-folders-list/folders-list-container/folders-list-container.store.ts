import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ApiService } from '@users/core/http';
import { catchError, first, of, tap } from 'rxjs';
import {
  FolderVM,
  FolderPostRequest,
} from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';

interface TypeInitialState {
  folders: FolderVM[];
  isLoading: boolean | null;
  error: null | string;
}

const initialState: TypeInitialState = {
  folders: [],
  isLoading: null,
  error: null,
};
@Injectable()
export class FoldersListContainerStore extends ComponentStore<TypeInitialState> {
  readonly apiUrl = inject(ApiService);
  public readonly folders$ = this.select((state) => state.folders);
  public readonly isLoading$ = this.select((state) => state.isLoading);

  constructor() {
    super(initialState);
  }

  public pushNewFolder(title: string) {
    const newFolder: FolderPostRequest = {
      title,
    };

    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));

    this.effect(() =>
      this.apiUrl
        .post<FolderVM, FolderPostRequest>('/folder', newFolder)
        .pipe(
          first(),
          tap((folder) => {
            this.patchState((state) => ({
              ...state,
              isLoading: false,
              folders: [...state.folders, folder],
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

  public deleteFolder(id: any) {
    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));
    this.effect(() =>
      this.apiUrl.delete<FolderVM[]>('/folder/' + id).pipe(
        first(),
        tap(() => {
          this.patchState((state) => ({
            ...state,
            isLoading: false,
            folders: state.folders.filter((folder) => folder.id !== id),
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

  public loadFolders() {
    this.patchState((state) => ({
      ...state,
      isLoading: true,
    }));
    this.effect(() =>
      this.apiUrl.get<FolderVM[]>('/folder').pipe(
        first(),
        tap((folders) => {
          this.patchState((state) => ({
            ...state,
            isLoading: false,
            folders,
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
