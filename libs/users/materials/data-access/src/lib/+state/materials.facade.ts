import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Folder } from "./interfaces";
import * as materialsSelector from './materials.selectors';
import * as materilasActions from "./materials.actions";

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  
  public readonly folders$: Observable<Folder[]> = this.store.pipe(select(materialsSelector.selectFolders))

  init() {this.store.dispatch(materilasActions.initFolders())};

  delete(id: number) {this.store.dispatch(materilasActions.deleteFolder({id}))};

  add(title: string) {this.store.dispatch(materilasActions.addFolder({title}))}
}