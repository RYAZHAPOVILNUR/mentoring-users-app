import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderType } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {

  @Input({required: true})
  folder!: FolderType;
  @Output() folderToDelete = new EventEmitter<FolderType>();

  public dateFormat(time: string): string {
    const date = new Date(time);
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
  }

  public onDeleteFolder(folder: FolderType) {
    this.folderToDelete.emit(folder);
  }
}
