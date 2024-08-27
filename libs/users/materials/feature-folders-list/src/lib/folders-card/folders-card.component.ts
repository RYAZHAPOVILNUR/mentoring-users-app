import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '../..';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: FoldersVM;

  showDeleteButton = false;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteFolder(folderId: number) {
    this.deleteFolder.emit(folderId);
  }

  onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}
