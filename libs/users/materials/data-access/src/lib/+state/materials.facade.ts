import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as materialsSelector from './materials.selectors'
import { MaterialsActions } from './materials.actions';
import { CreateIFolder, IFolder } from '../models/folder.interface';

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store: Store = inject(Store)
  public readonly folders$ = this.store.select(materialsSelector.selectAllFolders)
  public readonly status$ = this.store.select(materialsSelector.selectMaterialsStatus)
  public readonly errors$ = this.store.select(materialsSelector.selectMaterialsError)

  public init() {
    this.store.dispatch(MaterialsActions.loadFolders())
  }

  addFolder(newFolder: CreateIFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ newFolder }))
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}))
  }
}

