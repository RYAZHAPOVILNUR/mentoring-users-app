import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { folderFeature } from './folders.reducer';
import { folderActions } from './folders.actions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(folderFeature.selectFolders);
  public readonly isLoading$ = this.store.select(folderFeature.selectIsLoading);

  public removeFolder(folderId: number): void {
    this.store.dispatch(folderActions.removeFolder({ folderId }));
  }

  public createFolder(folderTitle: string): void {
    this.store.dispatch(folderActions.createFolder({ title: folderTitle }));
  }

  public loadFolders(): void {
    this.store.dispatch(folderActions.loadFolders());
  }
}
