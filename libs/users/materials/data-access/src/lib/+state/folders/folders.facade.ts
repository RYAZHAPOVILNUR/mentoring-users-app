import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as FoldersActions from './folders.actions';
import { CreateFoldersDTO } from "../../models/folders-dto.model";
import * as FoldersSelectors from './folders.selectors';
import { Observable } from "rxjs";
import { FoldersErrors } from "./folders.reducer";


@Injectable({
  providedIn: 'root',
})
export class FoldersFacade {

  private readonly store = inject(Store);

  public readonly foldersStatus$ = this.store.select(FoldersSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(FoldersSelectors.selectAllFolders);
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly errors$: Observable<FoldersErrors | null> = this.store.select(
    FoldersSelectors.selectFoldersError
  );

  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }
  
  addFolder(folderData: CreateFoldersDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }));
  }
  
}

 