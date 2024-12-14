import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListViewModel } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FoldersListCardComponent } from '../folders-list-card/folders-list-card.component';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, FoldersListCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true})
  vm!: FoldersListViewModel;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(event: Event) {
    this.openFolder.emit(event)
  }
}
