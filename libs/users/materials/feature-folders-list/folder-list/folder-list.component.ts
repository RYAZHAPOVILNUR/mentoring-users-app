import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { FolderEntity, vmFolders } from '../../data-access/src';
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: 'users-folder-list',
  standalone: true,
  imports: [
    CommonModule,
    FolderCardComponent,
    MatProgressBarModule
  ],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent {
  @Input({required: true}) vm!: vmFolders;
  @Output() deleteFolder = new EventEmitter<FolderEntity>()
  
  onDeleteFolder(folder: FolderEntity){
    this.deleteFolder.emit(folder);
  }
}