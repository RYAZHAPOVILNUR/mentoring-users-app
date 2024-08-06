import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialSelector from './matearial.selector';
import * as MaterialAction from './matearial.action';
import { CreateFolder, CreateMaterial } from '../model/material.interface';
import { selectQueryParam, selectRouteParams } from '@users/core/data-access';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.pipe(select(MaterialSelector.selectAllFolders));
  public readonly openedMaterial$ = this.store.pipe(select(MaterialSelector.selectOpenedMaterials));
  public readonly status$ = this.store.pipe(select(MaterialSelector.selectMaterialStatus));
  public readonly error$ = this.store.pipe(select(MaterialSelector.selectMaterialError));
  public readonly routeParams$ = this.store.pipe(select(selectRouteParams));

  getValueFromUrl(name: string): Observable<string | undefined> {
    return this.store.pipe(select(selectQueryParam(name)));
  }

  public initFolders(): void {
    this.store.dispatch(MaterialAction.initFolders());
  }

  public initMaterials(): void {
    this.store.dispatch(MaterialAction.loadMaterial());
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialAction.deleteFolder({ id }));
  }

  public deleteMaterial(id: number): void {
    this.store.dispatch(MaterialAction.deleteMaterial({ id }));
  }

  public createFolder(folder: CreateFolder): void {
    this.store.dispatch(MaterialAction.createFolder({ folder }));
  }

  public createMaterial(material: CreateMaterial): void {
    this.store.dispatch(MaterialAction.createMaterial({ material }));
  }
}
