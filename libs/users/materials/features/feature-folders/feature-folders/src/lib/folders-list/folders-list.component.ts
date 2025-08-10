import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '@users/data-access-folders';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input() folders: Folder[] = [];
  @Output() deleteFolder = new EventEmitter<Folder>();

  onDelete(folder: Folder) {
    this.deleteFolder.emit(folder);
  }
}
