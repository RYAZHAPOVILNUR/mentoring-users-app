import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectAllFolders, selectFoldersError, selectFoldersStatus } from './materials.selectors';
import { CreateFolder } from '../models/create-folder.model';


@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(selectFoldersStatus);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly error$ = this.store.select(selectFoldersError);

  public loadFolder() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public addFolder(materialsFolder: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder: materialsFolder }));
  }

}
