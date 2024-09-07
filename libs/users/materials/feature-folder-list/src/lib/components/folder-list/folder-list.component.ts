import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { CreateFolderDialogService } from '../../../../../feature-folder-create/src/lib/services/create-folder-dialog.service';

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
  providers: [CreateFolderDialogService],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FolderCardComponent,
    FolderAddButtonComponent,
  ],
})
export class FolderListComponent {
  private readonly createFolderDialogService: CreateFolderDialogService =
    inject(CreateFolderDialogService);
  @Input() public folderVm: FolderVm | null = null;

  @Output() public readonly deleteFolder = new EventEmitter<number>();
  @Output() public readonly openFolder = new EventEmitter<Folder>();

  public readonly trackByFn: TrackByFunction<Folder> = (
    _index,
    entity: Folder
  ): number => entity.id;

  public showFolderCreateDialog() {
    this.createFolderDialogService.showFolderCreateDialog().subscribe();
  }
}
