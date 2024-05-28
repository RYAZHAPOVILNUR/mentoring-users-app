import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: Folder;
  @Output() deleteFolder = new EventEmitter<Folder>();

  onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }
}
