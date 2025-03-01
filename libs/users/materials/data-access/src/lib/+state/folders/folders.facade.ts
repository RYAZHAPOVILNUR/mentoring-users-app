import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { CreateFolderDTO } from '../../models/folders.models';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private store = inject(Store);

  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectEntity));
  // public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);
  // public readonly loggedUser$ = this.store.select(selectLoggedUser);
  public readonly errors$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));

    init() {
      this.store.dispatch(FoldersActions.initFolders());
    }

    addFolder(folderData: CreateFolderDTO) {
      this.store.dispatch(FoldersActions.addFolder({ folderData }));
    }
    
    deleteFolder(id: number) {
      this.store.dispatch(FoldersActions.deleteFolder({ id }));
    }
      

      // getFolderFromStore(id: number) {
      //   return this.store.select(FoldersSelectors.selectFolderById(id)).pipe(
      //     switchMap((folder: FoldersEntity | undefined): Observable<FoldersEntity | null> => {
      //       if (folder) {
      //         return of(folder);
      //       } else {
      //         return of(null);
      //       }
      //     })
      //   );
      // }
    
      // loadFolder() {
      //   this.store.dispatch(FoldersActions.loadFolder());
      // }
    
  
}
