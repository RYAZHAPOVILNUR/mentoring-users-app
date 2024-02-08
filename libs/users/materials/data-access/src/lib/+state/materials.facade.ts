import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectFolders, selectIsLoading } from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly isLoading$ = this.store.select(selectIsLoading);

  init(): void {
    this.store.dispatch(MaterialsActions.loadMaterialss());
  }

  addNewFolder(title: string): void {
    this.store.dispatch(MaterialsActions.addMaterialsFolder({ title }));
  }

  deleteFolder(folderId: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterialsFolder({folderId}));
  }
}
