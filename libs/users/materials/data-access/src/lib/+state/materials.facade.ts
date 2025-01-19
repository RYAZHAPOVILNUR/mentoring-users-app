import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }
}
