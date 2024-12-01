import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FolderDTO } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  @Input() folder!: FolderDTO;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();
  onDeleteFolder(folder: FolderDTO) {
    this.deleteFolder.emit(folder);
  }
  onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
  dateFormat(time: number): string {
    const date = new Date(time);
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
  }
}
