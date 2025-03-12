import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import * as FoldersSelectors from '../folders/folders.selectors';
import { CreateMaterialDTO } from '../../models/materials.models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectFilteredMaterial));
  public readonly selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectMaterialEntity));
  public readonly errors$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));
  
  public readonly selectFolderById$ = this.store.pipe(select(FoldersSelectors.selectFolderById));

    init() {
      this.store.dispatch(MaterialsActions.initMaterials());
    }

    deleteMaterial(id: number) {
      this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
    }

    addMaterial(material: CreateMaterialDTO) {
      this.store.dispatch(MaterialsActions.addMaterial({ material }));
    }
    
    loadMaterial() {
      this.store.dispatch(MaterialsActions.loadMaterial());
    }
}
