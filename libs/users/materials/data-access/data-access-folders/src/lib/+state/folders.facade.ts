import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadingStatus } from '@shared/util-store';

import { FoldersActions } from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { AddFolder, Folder } from '../interface/folders.interface';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly allFolders$: Observable<Folder[]> = this.store.select(FoldersSelectors.selectAllFolders);
  public readonly foldersStatus$: Observable<LoadingStatus> = this.store.select(FoldersSelectors.selectFoldersStatus);
  public readonly foldersError$: Observable<HttpErrorResponse | null> = this.store.select(
    FoldersSelectors.selectFoldersError,
  );
  public readonly openedFolder$: Observable<Folder | null | undefined> = this.store.select(
    FoldersSelectors.selectOpenedFolder,
  );

  loadFolders(): void {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  addFolder(folder: AddFolder): void {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }

  deleteFolder(id: number): void {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  openFolder(id: number): void {
    this.store.dispatch(FoldersActions.openFolder({ id }));
  }
}
