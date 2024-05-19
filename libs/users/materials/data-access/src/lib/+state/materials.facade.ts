import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {MaterialsActions} from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { CreateFolderDTO } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectFolders)
  public readonly selectedMaterials$ = this.store.select(MaterialsSelectors.selectEntity)
  public readonly selectStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus)
  public readonly selectErrors$ = this.store.select(MaterialsSelectors.selectFolderErrors)

  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }

  addFolder(folder: CreateFolderDTO) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }))
  }
}
