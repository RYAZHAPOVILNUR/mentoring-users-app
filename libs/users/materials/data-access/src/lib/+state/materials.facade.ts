import { inject, Injectable } from "@angular/core";
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';
import { select, Store } from "@ngrx/store";
import { MaterialsErrors } from "./materials.reducer";
import { Observable, of, switchMap } from "rxjs";
import { FolderType } from "./folder.materials.model";

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
    private readonly store = inject(Store)

    public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectUsersStatus));
    public readonly allFolders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
    public readonly selectedFolders$ = this.store.pipe(select(MaterialsSelectors.selectEntity));
    public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder);
    public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectUsersError));

    load() {
        this.store.dispatch(MaterialsActions.loadFolders());
    }
    
    deleteFolder(id: number) {
        this.store.dispatch(MaterialsActions.deleteFolder({ id }));
    }
    
    addFolder(folder: FolderType) {
        this.store.dispatch(MaterialsActions.addFolder({ folder }));
    }
    
    getFolderFromStore(id: number) {
        return this.store.select(MaterialsSelectors.selectFolderById(id)).pipe(
            switchMap((folder: FolderType | undefined): Observable<FolderType | null> => {
                if (folder) {
                    return of(folder);
                } else {
                    return of(null);
                }
            })
        );
    }
    
    loadUser() {
        this.store.dispatch(MaterialsActions.loadFolder());
    }
}