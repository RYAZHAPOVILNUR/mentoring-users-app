import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as SelectMaterials from './materials.selectors'
import * as MaterialsActions from './materials.actions';
import { FolderAdd } from "../models/folder-add.model";
import { MaterialAdd } from "../models/material-add.model";

@Injectable({providedIn: 'root'})
export class MaterialFacade {
    
    private readonly store = inject(Store);
    public readonly folders$ = this.store.select(SelectMaterials.selectMaterialsFolders);
    public readonly statusFolders$ = this.store.select(SelectMaterials.selectMaterialsFoldersStatus);
    public readonly errorFolder$ = this.store.select(SelectMaterials.selectMaterialsFoldersError);


    public readonly materials$ = this.store.select(SelectMaterials.selectMaterials);
    public readonly statusMaterials$ = this.store.select(SelectMaterials.selectMaterialsStatus);
    public readonly errorMaterials$ = this.store.select(SelectMaterials.selectMaterialsError);

    initFolders(){
        this.store.dispatch(MaterialsActions.initFolders());
    }
    createFolder(folder: FolderAdd){
        this.store.dispatch(MaterialsActions.createFolders({ folder }));
    }
    deleteFolder(id:number){
        this.store.dispatch(MaterialsActions.deleteFolders({ id }));
    }
    
    loadMaterials(folder_id: number){
        this.store.dispatch(MaterialsActions.loadMaterials({ folder_id }));
    }
    
    createMaterials(material: MaterialAdd){
        this.store.dispatch(MaterialsActions.createMaterials({ material }));
    }
    deleteMaterials(material_id: number){
        this.store.dispatch(MaterialsActions.deleteMaterials({ material_id }));
    }
}