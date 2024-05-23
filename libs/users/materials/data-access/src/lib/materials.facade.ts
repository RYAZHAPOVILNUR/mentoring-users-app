import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Folder, Material, MaterialRes } from "./interfaces";
import * as materialsSelector from './+state/materials.selectors';
import * as materilasActions from "./+state/materials.actions";
import { LoadingStatus } from "@users/core/data-access";

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  
  public readonly folders$: Observable<Folder[]> = this.store.pipe(select(materialsSelector.selectFolders));
  public readonly folder$: Observable<Folder> = this.store.pipe(select(materialsSelector.selectFolder));
  public readonly status$: Observable<LoadingStatus> = this.store.pipe(select(materialsSelector.selectMatStatus));
  public readonly mats$: Observable<Material[]> = this.store.pipe(select(materialsSelector.selectMats));

  public loadFolders() {
    this.store.dispatch(materilasActions.loadFolders())
  };

  public deleteFolder(id: number) {
    this.store.dispatch(materilasActions.deleteFolder({id}))
  };

  public deleteMaterial(id: number) {
    this.store.dispatch(materilasActions.deleteMat({id}))
  };

  public addFolder(title: string) {
    this.store.dispatch(materilasActions.addFolder({title}))
  };

  public addMaterial(res: MaterialRes) {
    this.store.dispatch(materilasActions.addMat({res}))
  };

  public loadFolderId(id: string) {
    this.store.dispatch(materilasActions.loadFolderId({id}))
  };

  public loadMaterials(){
    this.store.dispatch(materilasActions.loadMat())
  }
}