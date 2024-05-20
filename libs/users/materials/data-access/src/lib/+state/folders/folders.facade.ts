import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Folder } from '../../interfaces/folder.interface';
import { selectFolders, selectFoldersStatus } from './folders.selectors';
import { LoadingStatus } from '@users/core/data-access';
import { foldersActions } from './foldersActions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private store = inject(Store);
  folders$: Observable<Folder[]> = this.store.select(selectFolders);
  status$: Observable<LoadingStatus> = this.store.select(selectFoldersStatus);

  loadFolders() {
    this.store.dispatch(foldersActions.loadFolders());
  }
  renameFolder(newName: string) {
    this.store.dispatch(foldersActions.renameFolder({ newName }))
  }
}