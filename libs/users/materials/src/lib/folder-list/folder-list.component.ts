import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';
import { MaterialStatus } from 'libs/users/materials/data-access/src/lib/enums/materials-status.enum';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';

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
  imports: [CommonModule],
})
export class FolderListComponent {
  @Input() public folderVm: FolderVm | null = null;

  public readonly trackByFn: TrackByFunction<Folder> = (
    _index,
    entity: Folder
  ): number => entity.id;
}
