import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { MaterialsActions } from "./materials.actions";
import { CreateFolderDTO, FolderDTO } from "@users/core/data-access";
import { selectAllFolders } from "./materials.selectors";

type onSuccessEditionCbType = () => void;

export class MaterialsFacade {
  private readonly store = inject(Store);
  private readonly allFolders$ = this.store.select(selectAllFolders);
  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }

  addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(MaterialsActions.addFolder({folderData}));
  }

  editFolder(folderData: FolderDTO, id: number, onSuccess: onSuccessEditionCbType) {
    this.store.dispatch(MaterialsActions.editFolder({folderData, id, onSuccess}))
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}));
  }
}