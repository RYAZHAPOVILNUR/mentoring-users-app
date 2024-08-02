import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderType } from '@users/materials/data-access';
import { FolderListVM } from './folders-list.view-model';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) vm!: FolderListVM;
  @Output() openFolder = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();

  public onOpenFolder(folder: FolderType): void {
    this.openFolder.emit(folder.id);
  }

  public onDeleteFolder(folder: FolderType): void {
    this.deleteFolder.emit(folder);
  }
}
