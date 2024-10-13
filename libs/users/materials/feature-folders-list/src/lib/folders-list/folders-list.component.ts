import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeepReadonly } from '@users/core/utils';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';

// interface FolderListVm {
//   folders: IFolder[];
//   status: LoadingStatus;
//   error: Error | null;
// }

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListComponent {
  @Input({ required: true }) folderVm!: FoldersListVM
}
export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  // status: string;
  // error: Error | null

}>;

export type FoldersVM = DeepReadonly<IFolder>;
