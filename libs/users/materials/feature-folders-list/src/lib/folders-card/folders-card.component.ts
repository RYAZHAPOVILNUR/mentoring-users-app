import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderType } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: FolderType;
  @Output() openFolder = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();

  public onOpenFolder(folder: FolderType): void {
    this.openFolder.emit(folder.id);
  }

  public onDeleteFolder(folder: FolderType): void {
    this.deleteFolder.emit(folder);
  }
}
