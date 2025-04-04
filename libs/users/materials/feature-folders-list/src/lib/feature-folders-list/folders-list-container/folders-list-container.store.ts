import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Folder } from '@users/materials/data-access';
import { MaterialsFacade } from '@users/materials/data-access';
import { switchMap, tap } from 'rxjs';

export interface FoldersListContainerState {
  folders: Folder[]
};

const initialState: FoldersListContainerState = {
  folders: []
};

@Injectable({ providedIn: 'root' })
export class FoldersListContainerStore extends ComponentStore<FoldersListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade)
  public readonly folders$ = this.select(({ folders }) => folders)

  constructor() {
    super(initialState);
  }

  readonly loadFolders = this.effect(() =>
    this.materialsFacade.loadFolders().pipe(
      switchMap(() => this.materialsFacade.allFolders),
      tap((folders: Folder[]) => {
        this.setState({ folders });
      })
    )
  );
}
