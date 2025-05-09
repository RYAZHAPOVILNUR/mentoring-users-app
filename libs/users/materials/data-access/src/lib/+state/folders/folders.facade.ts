import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { FoldersActions } from "./folders.actions";
import * as FoldersSelectors from "./folders.selectors";
import { Observable } from "rxjs";
import { FoldersErrors } from "./folders.reducer";

@Injectable({
    providedIn: 'root',
  })
  export class FoldersFacade {
    
    private readonly store = inject(Store);

    public readonly foldersStatus$ = this.store.select(FoldersSelectors.selectFoldersStatus);
    public readonly allFolders$ = this.store.select(FoldersSelectors.selectAllFolders);
    public readonly foldersError$: Observable<FoldersErrors | null> = this.store.select(FoldersSelectors.selectFoldersError);

    initFolders() {
      this.store.dispatch(FoldersActions.initFolders());
    }
  }