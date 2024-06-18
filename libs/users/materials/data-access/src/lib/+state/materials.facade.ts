import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { FolderAdd } from '../models/folder-add.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders);

  public loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public addFolder(folder: FolderAdd): void {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }
}
