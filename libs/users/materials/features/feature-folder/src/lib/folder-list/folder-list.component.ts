import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FolderVM } from '@users/data-access-folder';

import { FolderCardComponent } from '../folder-card/folder-card.component';

@Component({
  selector: 'users-folder-list',
  imports: [CommonModule, FolderCardComponent],
  templateUrl: './folder-list.component.html',
  styleUrl: './folder-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent {
  @Input({ required: true }) folders!: FolderVM[];
  @Output() deleteFolderClick = new EventEmitter<FolderVM>();

  onDeleteButtonClick(folder: FolderVM) {
    this.deleteFolderClick.emit(folder);
  }
}
