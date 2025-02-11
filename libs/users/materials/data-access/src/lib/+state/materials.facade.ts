import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAddFolder } from '../models/folder-add.model';
import { MaterialsActions } from './materials.actions';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  addFolder(folder: IAddFolder) {
    // this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }
}
