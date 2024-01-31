import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { selectFoldersEntities, 
         selectFoldersError, 
         selectFoldersStatus, 
         selectMaterialsEntities, 
         selectMaterialsError, 
         selectMaterialsStatus 
} from "./materials.selectors";
import { MaterialsActions } from "./materials.actions";
import { CreateMaterialDTO } from "../models/materials-dto.model";
import { CreateFolderDTO } from "../models/folders-dto.models";
import { FolderEntity } from "../models/folders.entity";
import { MaterialsEntity } from "../models/materials.entity";

@Injectable({providedIn: 'root'})
export class MaterialsFacade{
    private readonly store = inject(Store);

    public readonly foldersEntities$ = this.store.pipe(select(selectFoldersEntities));
    private readonly foldersStatus$ = this.store.pipe(select(selectFoldersStatus));
    private readonly foldersError$ = this.store.pipe(select(selectFoldersError));

    public readonly materialsEntities$ = this.store.pipe(select(selectMaterialsEntities));
    private readonly materialsStatus$ = this.store.pipe(select(selectMaterialsStatus));
    private readonly materialsError$ = this.store.pipe(select(selectMaterialsError));
    
    initFolder(){
        this.store.dispatch(MaterialsActions.loadFolders());
    }
    addFolder(folder: CreateFolderDTO){
        this.store.dispatch(MaterialsActions.addFolders({folder}));
    }
    deleteFolder(folder: FolderEntity){
        this.store.dispatch(MaterialsActions.deleteFolder({id: folder.id}));
    }

    //Materials
    initMaterials() {
        this.store.dispatch(MaterialsActions.loadMaterialss());
    }
    addMaterial(material: CreateMaterialDTO){
        this.store.dispatch(MaterialsActions.addMaterialss({material}));
    }
    deleteMaterial(material: MaterialsEntity){
        this.store.dispatch(MaterialsActions.deleteMaterialss({id: material.id}));
    }
}
