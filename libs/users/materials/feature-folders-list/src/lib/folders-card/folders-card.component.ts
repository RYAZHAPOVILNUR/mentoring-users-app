import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, TranslateModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({required: true})
  folder!: Folder;
  @Output() folderToDelete = new EventEmitter<Folder>();
  @Output() folderToOpen = new EventEmitter<number>();

  public onDeleteFolder(folder: Folder) {
    this.folderToDelete.emit(folder);
  }

  public onOpenFolder(folder: Folder) {
    this.folderToOpen.emit(folder.id);
  }
}
