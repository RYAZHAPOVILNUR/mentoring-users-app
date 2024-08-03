import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as MaterialsSelectors from './materials.selectors'
import { Observable } from "rxjs";
import { MaterialsErrors } from "./materials.reducer";
import { MaterialsActions } from "./materials.actions";
import { CreateFolder } from "../models/create-folder.model";

@Injectable({providedIn: "root"})
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allFolders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));

  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(folderData: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folderData }));
  }
}