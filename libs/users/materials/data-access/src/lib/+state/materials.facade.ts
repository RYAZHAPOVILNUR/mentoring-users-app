import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { folderActions } from './materials.actions';
import { materialsFeature } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(materialsFeature.selectFolders);
  public readonly isLoading$ = this.store.select(materialsFeature.selectIsLoading);

  init(): void {
    this.store.dispatch(folderActions.loadFolders());
  }

  createFolder(folderTitle: string): void {
    this.store.dispatch(folderActions.createFolder({ title: folderTitle }));
  }
}
