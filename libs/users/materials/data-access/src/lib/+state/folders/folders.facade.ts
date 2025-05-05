import { Injectable,inject } from "@angular/core";
import { Store ,select} from "@ngrx/store";
import * as FoldersActions from "./folders.actions";
import { IAddFolder } from "../../models/folders/folders-add.model";
import * as FoldersSelectors from './folders.selector';


@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly foldersStatus$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly foldersErrors$ = this.store.pipe(select(FoldersSelectors.selectFoldersErrors));

  addFolder(folder:IAddFolder){
    this.store.dispatch(FoldersActions.addFolder({folder}));
  }
  initFolders() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  
  loadFolder() {
    this.store.dispatch(FoldersActions.loadFolder());
  }
}
