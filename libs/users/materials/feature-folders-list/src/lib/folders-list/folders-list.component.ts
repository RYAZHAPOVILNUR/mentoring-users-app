import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderDTO } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  @Input({ required: true }) folders!: FolderDTO[];
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();
  onDeleteFolder(folder: FolderDTO) {
    this.deleteFolder.emit(folder)
  }
  onOpenFolder(folderId: number) {
    this.openFolder.emit(folderId);
  }
}
