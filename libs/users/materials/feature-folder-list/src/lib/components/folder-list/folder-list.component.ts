import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderCardComponent } from '../fodler-card/folder-card.component';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { MaterialStatus } from 'libs/users/materials/data-access/src/lib/enums/materials-status.enum';
import { FolderAddButtonComponent } from './../../../../../feature-folder-create/src/lib/components/folder-add-button/folder-add-button.component';

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
  imports: [
    CommonModule,
    MatProgressBarModule,
    FolderCardComponent,
    FolderAddButtonComponent,
  ],
})
export class FolderListComponent {
  @Input() public folderVm: FolderVm | null = null;

  @Output() public readonly deleteFolder = new EventEmitter<number>();
  @Output() public readonly openFolder = new EventEmitter<Folder>();

  public readonly trackByFn: TrackByFunction<Folder> = (
    _index,
    entity: Folder
  ): number => entity.id;
}
