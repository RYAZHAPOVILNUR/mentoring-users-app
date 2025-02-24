import { DeepReadonly } from '../../../../../../core/utils/src';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FoldersFacade } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { FoldersDTO } from '../../../../../../core/data-access/src';


type FoldersListState = DeepReadonly<{
  folders: FoldersDTO[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable({providedIn: 'root'})
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
  public errors$ = this.select(this.foldersFacade.error$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FoldersDTO[]) => this.patchState({folders: folders}))));
  }

}
