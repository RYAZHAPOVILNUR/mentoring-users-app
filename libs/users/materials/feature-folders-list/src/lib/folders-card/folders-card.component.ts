import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '@users/materials/data-access';
import { FileNameClipperPipe } from '@users/materials/utils';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, FileNameClipperPipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  @Input({ required: true })
  public folder!: Folder;
  @Output()
  public removeFolderEmit: EventEmitter<{ folderId: number, folderTitle: string }> = new EventEmitter<{ folderId: number, folderTitle: string }>();
  @Output()
  public openFolderEmit: EventEmitter<number> = new EventEmitter<number>();

  public openFolder(): void {
    this.openFolderEmit.emit(this.folder.id);
  }

  public removeFolder(): void {
    this.removeFolderEmit.emit({ folderId: this.folder.id, folderTitle: this.folder.title });
  }
}
