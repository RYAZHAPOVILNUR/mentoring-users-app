import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsFoldersSelectors from './folders.selectors';
import * as MaterialsFoldersActions from './folders.actions';

import { Observable } from 'rxjs';
import { TCreateFolderDTO } from '../../models/folders/folder-dto.model';
import { TFolderError } from '../../models/folders/folder-error.model';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsFoldersSelectors.selectMaterialsFoldersStatus));
  public readonly folders$ = this.store.pipe(select(MaterialsFoldersSelectors.selectAllFolders));
  public readonly errors$: Observable<TFolderError | null> = this.store.pipe(
    select(MaterialsFoldersSelectors.selectMaterialFoldersError)
  );

  public init(): void {
    this.store.dispatch(MaterialsFoldersActions.loadFolders());
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialsFoldersActions.deleteFolder({ id }));
  }

  public addFolder(folderData: TCreateFolderDTO): void {
    this.store.dispatch(MaterialsFoldersActions.addFolder({ folderData }));
  }
}
