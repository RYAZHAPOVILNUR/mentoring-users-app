import * as MaterialActions from './materials.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFolders } from './materials.selectors';
import { IAddFolder, IFolder } from '../model/folders-models';
import { materialSelectors } from '../..';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {

  private readonly store = inject(Store);

  public readonly folders$: Observable<IFolder[]> = this.store.select(selectFolders);

  public readonly openedFolder$ = this.store.select(materialSelectors.selectOpenedFolder)

  loadFolders() {
    this.store.dispatch(MaterialActions.loadFolders());
  } 

  addNewFolder(folder:IAddFolder){
    this.store.dispatch(MaterialActions.addFolder({folder}))
  }

  deleteFolder(id:number){
    this.store.dispatch(MaterialActions.deleteFolder({id}))
  }

  loadMaterials(){
    this.store.dispatch(MaterialActions.loadMaterials())
  }
}
