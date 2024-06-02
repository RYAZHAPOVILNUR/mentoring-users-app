import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderCardComponent } from '../fodler-card/folder-card.component';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { MaterialStatus } from 'libs/users/materials/data-access/src/lib/enums/materials-status.enum';

interface FolderVm {
  folders: Folder[];
  status: MaterialStatus;
  error: Error | null;
}

@Component({
  standalone: true,
  selector: 'users-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatProgressBarModule, FolderCardComponent],
})
export class FolderListComponent {
  @Input() public folderVm: FolderVm | null = null;

  @Output() public readonly deleteFolder = new EventEmitter<number>();

  public readonly trackByFn: TrackByFunction<Folder> = (
    _index,
    entity: Folder
  ): number => entity.id;

  public onDeleteFolder(id: number) {
    this.deleteFolder.emit(id);
  }
}
