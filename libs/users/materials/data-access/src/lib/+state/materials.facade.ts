import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllFolders, selectLoadingStatus } from './materials.selectors';
import { MaterialsActions } from './materials.actions';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectAllFolders);
  public readonly loadingStatus$ = this.store.select(selectLoadingStatus);

  public loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }
}
