import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './folders.selectors';
import { FoldersActions } from './folders.actions';
import { FoldersEntity } from '@users/materials/data-access';
import { Observable } from 'rxjs';
import { CreateFolderDTO } from '@users/materials/data-access';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(
    FoldersSelectors.selectFoldersStatus)
  );

  public readonly folders$: Observable<FoldersEntity[]> = this.store.pipe(select(
    FoldersSelectors.selectFolders)
  );

  public readonly error$ = this.store.pipe(select(
      FoldersSelectors.selectFoldersError
    )
  );

  public loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  };

  public addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }));
  }

  public deleteFolder(folderId: number): void {
    this.store.dispatch(FoldersActions.deleteFolder({ folderId }));
  }
}
