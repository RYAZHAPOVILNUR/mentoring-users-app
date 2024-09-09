import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectAllMaterials, selectMaterialsError, selectMaterialsStatus } from './materials.selectors';
import { Folder } from '../models/folder.model';


@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(selectMaterialsStatus);
  public readonly folder$ = this.store.select(selectAllMaterials);
  public readonly error$ = this.store.select(selectMaterialsError);

  public addFolder(materialsFolder: Folder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder: materialsFolder }));
  }

}
