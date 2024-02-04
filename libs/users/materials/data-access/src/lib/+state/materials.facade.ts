import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as materialsSelector from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { CreateFolder } from '../models/folder.models';
import { selectOpenedFolder } from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store: Store = inject(Store);
  public readonly folders$ = this.store.select(materialsSelector.selectAllFolders);
  public readonly status$ = this.store.select(materialsSelector.selectMaterialsStatus);
  public readonly errors$ = this.store.select(materialsSelector.selectMaterialsError);
  public readonly openedFolder$ = this.store.select(materialsSelector.selectOpenedFolder)
  public init() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(newFolder: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ newFolder }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }
}

