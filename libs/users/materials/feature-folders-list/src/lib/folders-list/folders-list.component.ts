import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderListVM } from './folders-vm.models';
import { FoldersVM } from '../../../../vm/folders-vm';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  folders!: FolderListVM;

  @Output()
  deleteFolder = new EventEmitter();

  @Output()
  openFolder = new EventEmitter();

  onDeleteFolder(folder: FoldersVM): void {
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(id: number): void {
    this.openFolder.emit(id);
  }

}
