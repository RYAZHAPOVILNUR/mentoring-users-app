import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addFolder,
  AddNewFolder, deleteFolder,
  FolderInterface,
  loadFolders,
  selectAllFolders,
  selectFoldersError
} from '@users/materials/data-access';


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly folders$: Observable<FolderInterface[]> = this.store.select(selectAllFolders);
  public readonly errors$: Observable<any> = this.store.select(selectFoldersError);

  loadFolders() {
    this.store.dispatch(loadFolders());
  }

  addNewFolder(newFolderData: AddNewFolder) {
    this.store.dispatch(addFolder({ newFolderData }));
  }

  deleteFolder(folderId: number) {
    this.store.dispatch(deleteFolder({ folderId }));
  }
}
