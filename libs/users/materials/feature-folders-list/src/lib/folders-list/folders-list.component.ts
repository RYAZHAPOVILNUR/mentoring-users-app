import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  public folders: Folder[] = [];
  @Output()
  public removeFolderEmit: EventEmitter<{ folderId: number, folderTitle: string }> = new EventEmitter<{ folderId: number, folderTitle: string }>();
  @Output()
  public openFolderEmit: EventEmitter<number> = new EventEmitter<number>();

  public onRemoveFolder(eventData: { folderId: number, folderTitle: string }): void {
    this.removeFolderEmit.emit(eventData);
  }
  public onOpenFolder(id: number): void {
    this.openFolderEmit.emit(id);
  }
}
