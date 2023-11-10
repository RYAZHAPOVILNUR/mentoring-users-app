import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Folder } from "../model/folder.model";
import { selectFolders, selectFoldersEntities } from "./materials.selectors";
import { MaterialsActions } from "./materials.actions";
import { CreateFolder } from "../model/folder-create.model";


@Injectable({providedIn: 'root'})
export class MaterialFacade {
  private readonly store = inject(Store);
  public readonly folders$: Observable<Folder[]> = this.store.select(selectFolders);
  public readonly foldersEntities$ = this.store.select(selectFoldersEntities);

  
  createFolder(folder:CreateFolder){
    this.store.dispatch(MaterialsActions.createFolder({folder}))
  }
}
