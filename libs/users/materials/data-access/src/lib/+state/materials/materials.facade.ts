import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';
import { IAddMaterial } from "../../models/material-add.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'})
export class MaterialsFacade {
    private readonly store = inject(Store)

    //selectors
    // public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus)
    // public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders)
    // public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder)
    // public readonly errors$: Observable<FoldersErrors | null> = this.store.select(MaterialsSelectors.selectFoldersError)
  
    // public readonly materialsStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus)
    // public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials)


  
    loadMaterials() {
      this.store.dispatch(MaterialsActions.loadMaterials())
    }
    deleteMaterial(id: number) {
      this.store.dispatch(MaterialsActions.deleteMaterial({ id }))
    }
    addMaterial(material: IAddMaterial) {
      this.store.dispatch(MaterialsActions.addMaterial({ material }))
    }
}