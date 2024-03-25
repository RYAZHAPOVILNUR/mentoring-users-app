import * as MaterialActions from './materials.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFolders } from './materials.selectors';
import * as materialSelectors from './materials.selectors';
import { AddMaterialEntity} from '../model/material.entity';
import { AddFolderDTO } from '../model/material-dto.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {

  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(selectFolders);

  public readonly openedFolder$ = this.store.select(materialSelectors.selectOpenedFolder)

  public readonly filteredMaterials$ = this.store.select(materialSelectors.filteredByIdMaterials)

  public readonly materialsStatus$ = this.store.select(materialSelectors.selectMaterialsStatus)

  loadOpenedFolderHandler(){
    return this.openedFolder$.pipe(
      tap(openedFolder => {
        if (!openedFolder) {
          this.loadFolders();
        }
      })
    )
  }


  loadFolders() {
    this.store.dispatch(MaterialActions.loadFolders());
  } 

  addNewFolder(folder:AddFolderDTO){
    this.store.dispatch(MaterialActions.addFolder({folder}))
  }

  deleteFolder(id:number){
    this.store.dispatch(MaterialActions.deleteFolder({id}))
  }

  loadMaterials(){
    this.store.dispatch(MaterialActions.loadMaterials())
  }

  addNewMaterial(material:AddMaterialEntity){
    this.store.dispatch(MaterialActions.addMaterial({material}))
  }

  deleteMaterial(id:number){
    this.store.dispatch(MaterialActions.deleteMaterial({id}))
  }
}
