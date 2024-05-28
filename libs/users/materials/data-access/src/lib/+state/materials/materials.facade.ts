import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { CreateMaterialsDTO } from '@users/core/data-access';
import { FoldersFacade } from '../folders/folders.facade';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  private readonly folderFacade = inject(FoldersFacade);

  public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectMaterials);
  public readonly selectStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly selectFolder$ = this.folderFacade.allFolders$;

  public init() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }
  public addMaterial(material: CreateMaterialsDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }
  public removeMaterial(id: number) {
    this.store.dispatch(MaterialsActions.removeMaterial({ id }));
  }
  public getFolder() {
    this.folderFacade.getFolder();
  }
}
