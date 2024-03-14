import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials-data-access';
import { FolderComponent } from '../folder/folder.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FolderComponent, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) public folders: Folder[] = [];
  // @Output() public readonly deleteFolderEmit: EventEmitter<{ id: number; title: string }> = new EventEmitter<{
  //   id: number;
  //   title: string;
  // }>();
  @Output() public readonly openFolderEmit: EventEmitter<number> = new EventEmitter<number>();

  // public deleteFolder({ id, title }: { id: number; title: string }) {
  //   this.deleteFolderEmit.emit({ id, title });
  // }

  public openFolder(id: number) {
    this.openFolderEmit.emit(id);
  }

  // @Input({ required: true }) public folder: Folder | null = null;
}
