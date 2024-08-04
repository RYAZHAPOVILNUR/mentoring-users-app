import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors'
import { IAddFolder } from '../models/folder-add.model';


@Injectable({providedIn: 'root'})
export class MaterialsFacade {
    private readonly store = inject(Store)
    
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders)
  public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus)
  public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder)
  
  
  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders())
  }
  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }))
  }
  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }))
  }
}