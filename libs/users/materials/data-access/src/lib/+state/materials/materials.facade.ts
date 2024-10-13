import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  // selectMaterials,
  selectAllFolders,
  // selectFolders,
  // selectLoadingStatus,
  selectMaterialError,
  selectMaterialStatus, selectAllMaterials
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { IMaterial } from '../../models/material.interface';
import { IFolder } from '../../models/folder.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);
    materials$ = this.store.select(selectAllMaterials);
    materialStatus$: Observable<string> = this.store.select(selectMaterialStatus);
    materialError$: Observable<Error | null> = this.store.select(selectMaterialError);
    public readonly folders$ = this.store.pipe(select(selectAllFolders));

  // public readonly status$ = this.store.pipe(selectMaterialStatus)

  // public readonly error$ = this.store.pipe(selectMaterialError)

  // public readonly allFolders$ = this.store.pipe(selectFolders)

  loadFolders() {
    console.log('Dispatching loadFolders action');
    this.store.dispatch(MaterialsActions.loadFolders());
  }
}
