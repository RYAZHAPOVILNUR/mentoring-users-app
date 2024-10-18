import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectMaterialError, selectMaterials, selectMaterialStatus } from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);
  public readonly materials$ = this.store.select(selectMaterials);
  public readonly materialStatus$: Observable<string> = this.store.select(selectMaterialStatus);
  public readonly materialError$: Observable<Error | null> = this.store.select(selectMaterialError);

  public loadMaterials() {
    console.log('Dispatching loadFolders action');
    this.store.dispatch(MaterialsActions.loadMaterials());
  }
}
