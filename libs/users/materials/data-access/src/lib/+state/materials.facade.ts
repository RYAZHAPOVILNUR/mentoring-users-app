import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { selectFolders, selectFoldersError, selectFoldersStatus } from './materials.selectors';
import { State, IFolder, IAddFolder } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store<State>);

  public readonly folders$: Observable<IFolder[]> = this.store.pipe(select(selectFolders));
  public readonly status$ = this.store.pipe(select(selectFoldersStatus));
  public readonly error$ = this.store.pipe(select(selectFoldersError));

  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: string) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  openFolder() {
    this.store.dispatch(MaterialsActions.openFolder());
  }
}