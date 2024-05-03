import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from './folders-add-button/folders-add-button.component';

@NgModule({
  imports: [CommonModule, FoldersAddButtonComponent],
  exports: [FoldersAddButtonComponent]
})
export class FeatureFolderCreateModule {}
