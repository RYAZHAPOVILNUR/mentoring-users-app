import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { Observable } from 'rxjs';
import { Folder } from '../models/folders.interface';

@Injectable({ providedIn: 'root' })

export class MaterialsFacade {
    private readonly store = inject(Store);

    public readonly allFolders: Observable<Folder[]> = this.store.select(MaterialsSelectors.selectFolders);
    public readonly loading$: Observable<boolean> = this.store.select(state => state.materials.loading);
    public readonly error$: Observable<string | null> = this.store.select(state => state.materials.error);

    loadFolders() {
        this.store.dispatch(MaterialsActions.loadFolders());
        return this.allFolders;
    }
}