import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderListVM } from './folders-list-vm';
import { IFolder } from '@users/materials/data-access';

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
  foldersList!: FolderListVM;
  @Output() deleteCard = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteCard(folder: IFolder) {
    this.deleteCard.emit(folder);
  }

  onOpenFolder(folder: IFolder) {
    this.openFolder.emit(folder);
  }
}
