import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentMaterial,
  selectMaterialError,
  selectMaterials,
  selectMaterialStatus
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { Observable } from 'rxjs';
import { selectFolders, selectOpenFolder } from '../folders/folders.selectors';
import { FoldersActions } from '../folders/folders.actions';
import { CreateFolderDTO } from '../../models/folders-dto.model';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);
  public readonly materials$ = this.store.select(selectMaterials);
  public readonly currentMaterial$ = this.store.select(selectCurrentMaterial);
  public readonly materialStatus$: Observable<string> = this.store.select(selectMaterialStatus);
  public readonly materialError$: Observable<Error | null> = this.store.select(selectMaterialError);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly currentFolder$ = this.store.select(selectOpenFolder);

  public loadMaterials() {
    console.log('Dispatching loadFolders action');
    this.store.dispatch(MaterialsActions.loadMaterials());
  }
  public loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders())
  }
  public addFolder(folderData: CreateFolderDTO) {}
}

