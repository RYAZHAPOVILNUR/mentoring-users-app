import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TFolder } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  public vm!: FoldersListVM;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteFolder(folder: TFolder) {
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(folder: TFolder) {
    this.openFolder.emit(folder.id);
  }
}
