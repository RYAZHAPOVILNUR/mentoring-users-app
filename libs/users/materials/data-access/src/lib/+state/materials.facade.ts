import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { MaterialsActions } from "./materials.actions";
import { CreateFolderDTO, FolderEntity } from "@users/core/data-access";
import * as MaterialsSelectors from "./materials.selectors";
import { Observable } from "rxjs";
import { FoldersError } from "./materials.reducer";

type onSuccessEditionCbType = () => void;

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(MaterialsSelectors.selectEntity));
  public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder);
  public readonly errors$: Observable<FoldersError | null> = this.store.pipe(select(MaterialsSelectors.selectFoldersError));
  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }

  addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(MaterialsActions.addFolder({folderData}));
  }

  editFolder(folderData: FolderEntity, id: number, onSuccess: onSuccessEditionCbType) {
    this.store.dispatch(MaterialsActions.editFolder({folderData, id, onSuccess}))
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}));
  }
}