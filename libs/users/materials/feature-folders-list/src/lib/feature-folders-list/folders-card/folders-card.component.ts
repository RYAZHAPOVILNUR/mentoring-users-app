import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input() folder: Folder | undefined;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onOpenFolder(folderId?: number): void {
    this.openFolder.emit(folderId);
  }

  onDeleteFolder(folderId?: number, event?: Event): void {
    event?.stopPropagation();
    this.deleteFolder.emit(folderId);
  }
}
