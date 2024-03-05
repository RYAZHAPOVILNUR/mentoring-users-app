import * as MaterialActions from './materials.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMaterials } from './materials.selectors';
import { IAddFolder, IFolder } from '../model/folders-models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {

  private readonly store = inject(Store);

  public readonly folders$: Observable<IFolder[]> = this.store.select(selectMaterials);

  loadFolders() {
    this.store.dispatch(MaterialActions.loadFolders());
  } 

  addNewFolder(folder:IAddFolder){
    this.store.dispatch(MaterialActions.addFolder({folder}))
  }
}
