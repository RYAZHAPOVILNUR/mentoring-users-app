import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectLoggedUser } from '@auth/data-access';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors'

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store)

  //selectors
  public readonly status$ = this.store.select(MaterialsSelectors.selectMaterialsStatus)
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders)

  //actions
  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders())
  }
}