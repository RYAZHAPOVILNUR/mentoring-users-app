import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { FoldersEntity, FoldersFacade, FoldersVM, foldersVMAdapter } from '@users/materials/data-access';
import { tap } from 'rxjs';

type FoldersListState = DeepReadonly<{
  folders: FoldersVM[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacede = inject(FoldersFacade);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacede.status$, (status) => status);
  public errors$ = this.select(this.foldersFacede.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacede.init();
    this.setFoldersFromGlobalToLocaleStore();
  }

  private setFoldersFromGlobalToLocaleStore(): void {
    this.effect(() =>
      this.foldersFacede.filtredFolders$.pipe(tap((folders: FoldersEntity[]) => this.patchFolder(folders)))
    );
  }

  private patchFolder(folders: FoldersEntity[]): void {
    this.patchState({
      folders: folders.map((folder) => foldersVMAdapter.entityToVM(folder)),
    });
  }
}
