import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialSelectors from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { CreateFolderInput } from '../models/create-folder.type';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(
    select(MaterialSelectors.selectMaterialStatus)
  );

  public readonly error$ = this.store.pipe(
    select(MaterialSelectors.selectMaterialError)
  );

  public readonly allFolders$ = this.store.pipe(
    select(MaterialSelectors.selectFolders)
  );

  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  createFolder(createFolderInput: CreateFolderInput) {
    this.store.dispatch(MaterialsActions.createFolder({ createFolderInput }));
  }
}
