import * as MaterialActions from './materials.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMaterials } from './materials.selectors';
import { IMaterial } from '../model/material-models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {

  private readonly store = inject(Store);

  public readonly materials$: Observable<IMaterial[]> = this.store.select(selectMaterials);

  loadMaterials() {
    this.store.dispatch(MaterialActions.loadMaterials());
  } 
}
