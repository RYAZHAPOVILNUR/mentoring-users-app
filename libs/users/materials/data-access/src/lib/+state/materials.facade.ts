import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import *as MaterialsSelector from './materials.selectors'
import *as MaterialsActions from './materials.actions'
import { FolderCreate } from './models/folders.interface'
import { MaterialCreate } from './models/materials.interface';
import { take } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class MaterialsFacade {
    store = inject(Store)
    foldersAll$ = this.store.select(MaterialsSelector.selectFolders);
    materialAll$ = this.store.select(MaterialsSelector.selectMaterialsFilter);

    get foldersAll() {
      let folders: any;
      this.store.select(MaterialsSelector.selectRawFolders)
        .pipe(take(1))
        .subscribe(v => folders = v);
      return folders;
    }

    initFolders(){
        this.store.dispatch(MaterialsActions.loadFolders())
    }
    deleteFolder(id: number){
        this.store.dispatch(MaterialsActions.deleteFolders({id}))
    }
    addFolders(folder: FolderCreate){
        this.store.dispatch(MaterialsActions.addFolder({folder}))
    }
    initMaterial(){
        this.store.dispatch(MaterialsActions.loadMaterial())
    }
    deleteMaterial(id: number){
      this.store.dispatch(MaterialsActions.deleteMaterial({id}))
    }
    addMaterials(material: MaterialCreate){
      this.store.dispatch(MaterialsActions.addMaterial({material}))
    }
}
