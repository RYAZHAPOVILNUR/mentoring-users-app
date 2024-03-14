import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllFolders,
  selectCurrentFolder,
  selectCurrentFolderMaterials,
  selectLoadingStatus,
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectAllFolders);
  public readonly loadingStatus$ = this.store.select(selectLoadingStatus);
  public readonly currentFolder$ = this.store.select(selectCurrentFolder);
  public readonly currentFolderMaterials$ = this.store.select(selectCurrentFolderMaterials);

  public loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public addFolder(title: string) {
    this.store.dispatch(MaterialsActions.addFolder({ title }));
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public folderContent() {
    this.store.dispatch(MaterialsActions.currentFolder());
  }

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }
}
