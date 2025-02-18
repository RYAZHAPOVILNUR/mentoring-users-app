import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MaterialsActions } from "./materials.actions";
import { MaterialSelectors } from "../..";
import { AddFolderDTO, AddMaterialDTO, FolderDTO, MaterialDTO } from "../models/interfaces";

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store)
  public readonly openedMaterial$ = this.store.select(MaterialSelectors.selectOpenedMaterial);
  public readonly status$ = this.store.select(MaterialSelectors.selectStatus)

  initFolders() {
    this.store.dispatch(MaterialsActions.initFolders())
  }

  initFiles() {
    this.store.dispatch(MaterialsActions.initFiles())
  }

  loadFile(file: AddMaterialDTO) {
    this.store.dispatch(MaterialsActions.loadFile({ file }))
  }

  deleteFile(file: MaterialDTO) {
    this.store.dispatch(MaterialsActions.deleteFile({ file }))
  }

  loadFolder(folder: AddFolderDTO) {
    this.store.dispatch(MaterialsActions.loadFolder({ folder }))
  }

  DeleteFolder(folder: FolderDTO, openFn: () => void) {
    this.store.dispatch(MaterialsActions.deleteFolder({ folder, openFn }))
  }
}