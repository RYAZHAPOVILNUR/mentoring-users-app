import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Folder, Mat, MatRes } from "./interfaces";
import * as materialsSelector from './materials.selectors';
import * as materilasActions from "./materials.actions";

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);  
  public readonly folders$: Observable<Folder[]> = this.store.pipe(select(materialsSelector.selectFolders));
  public readonly folderTitle$: Observable<string> = this.store.pipe(select(materialsSelector.selectFolderTitle));
  public readonly folder$: Observable<Folder> = this.store.pipe(select(materialsSelector.selectFolder));
  public readonly status$: Observable<string> = this.store.pipe(select(materialsSelector.selectMatStatus));
  public readonly mats$: Observable<Mat[]> = this.store.pipe(select(materialsSelector.selectMats));

  init() {this.store.dispatch(materilasActions.initFolders())};

  deleteFolder(id: number) {this.store.dispatch(materilasActions.deleteFolder({id}))};

  deleteMat(id: number) {this.store.dispatch(materilasActions.deleteMat({id}))};

  add(title: string) {this.store.dispatch(materilasActions.addFolder({title}))};

  addMat(res: MatRes) {this.store.dispatch(materilasActions.addMat({res}))};

  getFolderId(id: string) {this.store.dispatch(materilasActions.getFolderId({id}))};

  getMats(){this.store.dispatch(materilasActions.getMat())}
}