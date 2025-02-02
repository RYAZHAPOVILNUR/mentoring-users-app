import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from './folders.selectors';
import * as MaterialsActions from './folders.actions';

import { Observable } from 'rxjs';
import { TCreateFolderDTO } from '../../models/folders/folder-dto.model';
import { TFolderError } from '../../models/folders/folder-error.model';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly folders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly errors$: Observable<TFolderError | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialError)
  );

  public init() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public addFolder(folderData: TCreateFolderDTO): void {
    this.store.dispatch(MaterialsActions.addFolder({ folderData }));
  }
}
