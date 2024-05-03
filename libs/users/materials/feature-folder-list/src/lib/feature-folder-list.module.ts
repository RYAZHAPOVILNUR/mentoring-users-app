import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerComponent } from './folders-list-container/folders-list-container.component';
import { FoldersListComponent } from './folders-list/folders-list.component';

@NgModule({
  imports: [
    CommonModule, 
    FoldersListComponent,
    FoldersListContainerComponent
  ],
  declarations: [],
  exports: [
    FoldersListComponent,
    FoldersListContainerComponent
  ]
})
export class FeatureFolderListModule {}
