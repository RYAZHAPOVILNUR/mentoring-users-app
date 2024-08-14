import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { CreateFolder } from '../models/create-folder.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  // public addFolder(folderData: CreateFolder) {
  //   this.store.dispatch(MaterialsActions.addFolder({ folderData }));
  // }
}
