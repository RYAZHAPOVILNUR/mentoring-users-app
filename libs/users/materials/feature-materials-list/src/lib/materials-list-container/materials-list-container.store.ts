import { Injectable } from '@angular/core';
import { DeepReadonly } from '@users/core/utils';
import { IFolder } from '@users/materials/data-access';
import { ComponentStore } from '@ngrx/component-store';

type currentFolderState = DeepReadonly<{
  folder: IFolder;
}>;

const initialState: currentFolderState = {
  folder: {} as IFolder,
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<currentFolderState> {
  constructor() {
    super(initialState);
  }

  setFolder(folder: IFolder): void {
    this.setState({ folder });
    this.folder$.subscribe((currentFolder) => {
      console.log('Current Folder State:', currentFolder);
    });
    this.folderTitle$.subscribe((title) => {
      console.log('Title from folderTitle$: ', title);
    });
  }

  public folder$ = this.select((state) => state.folder);
  public folderTitle$ = this.select((state) => {
    return state.folder.title;
  });
}
