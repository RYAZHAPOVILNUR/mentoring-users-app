import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFolders, selectFoldersStatus } from './folders.selectors';
import { foldersActions } from './folders.actions';
import { MaterialsState } from '../../services/materials.state';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private store = inject(Store);
  private materialsState = inject(MaterialsState);

  readonly folders$ = this.store.select(selectFolders);
  readonly status$ = this.store.select(selectFoldersStatus);
  readonly deleteFolder$ = this.materialsState.deleteFolder$;
  readonly openFolder$ = this.materialsState.openFolder$;

  loadFolders(): void {
    this.store.dispatch(foldersActions.loadFolders());
  }

  createFolder(title: string): void {
    this.store.dispatch(foldersActions.createFolder({ title }));
  }

  deleteFolder(id: number): void {
    this.store.dispatch(foldersActions.deleteFolder({ id }));
  }
}