import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectFolders, selectFoldersError, selectFoldersStatus } from './materials.selectors';
import { State, IAddFolder } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(selectFolders);
  public readonly status$ = this.store.select(selectFoldersStatus);
  public readonly error$ = this.store.select(selectFoldersError);

  loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(folder: IAddFolder): void {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: string): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  openFolder() {
    this.store.dispatch(MaterialsActions.openFolder());
  }
}