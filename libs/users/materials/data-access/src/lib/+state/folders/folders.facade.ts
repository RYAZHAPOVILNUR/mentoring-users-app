import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { FoldersActions } from "./folders.actions";
import * as FoldersSelectors from "./folders.selectors";
import { Observable } from "rxjs";
import { FoldersErrors } from "./folders.reducer";
import { AddFoldersType } from "../../models/folder.type";

@Injectable({
    providedIn: 'root',
  })
  export class FoldersFacade {
    
    private readonly store = inject(Store);

    public readonly foldersStatus$ = this.store.select(FoldersSelectors.selectFoldersStatus);
    public readonly allFolders$ = this.store.select(FoldersSelectors.selectAllFolders);
    public readonly foldersError$: Observable<FoldersErrors | null> = this.store.select(FoldersSelectors.selectFoldersError);
    public readonly titleFolder$ = this.store.select(FoldersSelectors.selectTitleFolder);

    initFolders() {
      this.store.dispatch(FoldersActions.initFolders());
    }

    addFolder(folder: AddFoldersType) {
      this.store.dispatch(FoldersActions.addFolder({ folder }));
    }

    deleteFolder(id: number) {
      this.store.dispatch(FoldersActions.deleteFolder({ id }));
    }
    
  }