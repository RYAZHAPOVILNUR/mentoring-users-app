import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.select(MaterialsSelectors.selectStatus);
  allFolders$ = this.store.select(MaterialsSelectors.selectFolders);
  allMaterials$ = this.store.select(MaterialsSelectors.selectMaterials);
  error$ = this.store.select(MaterialsSelectors.selectError);

  public onCreateFolder(newData: { title: string }): void {
    this.store.dispatch(MaterialsActions.setAddFolder({ newData }));
  }

  public onDeleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.setDeleteFolder({ id }));
  }

  public onCreateMaterial(data: any): void {
    this.store.dispatch(MaterialsActions.setAddMaterial({ data }));
  }

  public onDeleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.setDeleteMaterial({ id }));
  }

  public initMaterials(id: unknown): void {
    this.store.dispatch(MaterialsActions.initMaterials({ id }));
  }

  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }
}
