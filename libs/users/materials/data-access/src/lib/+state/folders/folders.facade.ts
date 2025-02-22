import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { FolderModel } from '../../models/folder.model';
import {
  selectAllFolders,
  selectFolderEntities,
  selectFolderIds,
  selectTotalFolders,
  selectFolderById,
} from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private store = inject(Store);
  folders$: Observable<FolderModel[]> = this.store.select(selectAllFolders);
  isLoading$ = this.store.select((state) => state.folders?.loading ?? false);

  loadAllFolders(): void {
    this.store.dispatch(FoldersActions.loadAllFolders());
  }
}
