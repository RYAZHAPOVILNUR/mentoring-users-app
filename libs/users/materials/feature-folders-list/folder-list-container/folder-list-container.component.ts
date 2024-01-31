import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FolderEntity, MaterialsFacade, selectFoldersEntities, selectFoldersError, selectFoldersStatus } from '../../data-access/src';
import { FolderListComponent } from '../folder-list/folder-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/feature-folders-create'

@Component({
  selector: 'users-folder-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FolderListComponent,
    LetDirective,
    FoldersAddButtonComponent
  ],
  templateUrl: './folder-list-container.component.html',
  styleUrls: ['./folder-list-container.component.scss'],
})
export class FolderListContainerComponent {
  store = inject(Store);
  materialsFacade = inject(MaterialsFacade);
  public folders$ = this.store.select(selectFoldersEntities);
  public status$ = this.store.select(selectFoldersStatus);
  public error$ = this.store.select(selectFoldersError);

  constructor(){
    this.materialsFacade.initFolder();
  }

  onDeleteFolder(folder: FolderEntity){
    this.materialsFacade.deleteFolder(folder);
  }
}
