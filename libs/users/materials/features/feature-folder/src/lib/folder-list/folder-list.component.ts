import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '@users/data-access-folder';

import { FolderCardComponent } from '../folder-card/folder-card.component';

@Component({
  selector: 'users-folder-list',
  imports: [CommonModule, FolderCardComponent],
  templateUrl: './folder-list.component.html',
  styleUrl: './folder-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent {
  @Input({ required: true }) folders!: Folder[];
  @Output() deleteFolderClick = new EventEmitter<Folder>();

  onDeleteButtonClick(folder: Folder) {
    this.deleteFolderClick.emit(folder);
  }
}
