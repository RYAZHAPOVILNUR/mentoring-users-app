import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectAllFolders, selectStatus } from './materials.selectors';

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly foldersStatus$ = this.store.select(selectStatus);

  public initFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}))
  }
}
