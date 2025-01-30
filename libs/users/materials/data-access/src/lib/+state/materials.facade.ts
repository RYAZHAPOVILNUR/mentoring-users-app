import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';

import { Observable } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import { TCreateFoldersDTO } from '../models/folders/folder-dto.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly folders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialError)
  );

  public init() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public addFolder(folderData: TCreateFoldersDTO): void {
    this.store.dispatch(MaterialsActions.addFolder({ folderData }));
  }
}
