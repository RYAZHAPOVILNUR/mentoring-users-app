import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { folderActions, materialActions } from './materials.actions';
import { materialsFeature } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(materialsFeature.selectFolders);
  public readonly isLoading$ = this.store.select(materialsFeature.selectIsLoading);
  public readonly materials$ = this.store.select(materialsFeature.selectMaterials);

  public loadFolders(): void {
    this.store.dispatch(folderActions.loadFolders());
  }

  public createFolder(folderTitle: string): void {
    this.store.dispatch(folderActions.createFolder({ title: folderTitle }));
  }

  public removeFolder(folderId: number): void {
    this.store.dispatch(folderActions.removeFolder({ folderId }));
  }

  public loadMaterials() {
    this.store.dispatch(materialActions.loadMaterials());
  }
}
