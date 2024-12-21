import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectAllFolders, selectAllMaterials, selectMaterialsStatus } from './materials.selectors';


@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  folders$ = this.store.pipe(select(selectAllFolders));
  status$ = this.store.pipe(select(selectMaterialsStatus));
  materials$ = this.store.pipe(select(selectAllMaterials));



  init() {
    this.store.dispatch(MaterialsActions.loadMaterialsFolders());
  }

  addFolder(folder: string): void {
    this.store.dispatch(MaterialsActions.addMaterialsFolder({title: folder}))
  }

  deleteFolder(folder_id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterialsFolder({folder_id: folder_id}))
  }

  loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterials())
  }

}
