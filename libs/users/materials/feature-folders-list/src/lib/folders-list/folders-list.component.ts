import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersVm } from '../../../../folders-vm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) public vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter<{ folderId: number; folderTitle: string }>();
  @Output() editFolder = new EventEmitter<FoldersVm>();
  @Output() openFolder = new EventEmitter<{ folderId: number; folderTitle: string }>();

  public onDeleteFolder(data: { folderId: number; folderTitle: string }) {
    this.deleteFolder.emit(data);
  }

  public onEditFolder(folder: FoldersVm) {
    this.editFolder.emit(folder);
  }

  public onOpenFolder(folderData: { folderId: number; folderTitle: string }) {
    this.openFolder.emit(folderData);
  }
}
