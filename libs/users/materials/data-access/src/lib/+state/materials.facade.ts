import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { Observable } from 'rxjs';
import { Folder, newFolder } from '../models/folders.interface';
import { Material, newMaterial } from '../models/materials.interface';

@Injectable({ providedIn: 'root' })

export class MaterialsFacade {
    private readonly store = inject(Store);

    public readonly allFolders: Observable<Folder[]> = this.store.select(MaterialsSelectors.selectFolders);
    public readonly allMaterials: Observable<Material[]> = this.store.select(MaterialsSelectors.selectMaterials);
    public readonly loading$: Observable<boolean> = this.store.select(state => state.materials.loading);
    public readonly error$: Observable<string | null> = this.store.select(state => state.materials.error);
    public readonly selectedFolderId$: Observable<number | null> = this.store.select(MaterialsSelectors.selectSelectedFolderId)

    loadFolders() {
        this.store.dispatch(MaterialsActions.loadFolders());
        return this.allFolders;
    }

    createFolder(folder: newFolder) {
        this.store.dispatch(MaterialsActions.createFolder({folder}));
    }

    deleteFolder(folderId: number) {
        this.store.dispatch(MaterialsActions.deleteFolder({folderId}))
    }

    openFolder(folderId: number) {
        this.store.dispatch(MaterialsActions.openFolder({folderId}))
    }

    loadMaterials(folderId: number) {
        this.store.dispatch(MaterialsActions.loadMaterials({folderId}));
        return this.allMaterials;
    }

    createMaterial(material: newMaterial) {
        this.store.dispatch(MaterialsActions.createMaterial({material}));
    }

    deleteMaterial(materialId: number) {
        this.store.dispatch(MaterialsActions.deleteMaterial({materialId}))
    }
}