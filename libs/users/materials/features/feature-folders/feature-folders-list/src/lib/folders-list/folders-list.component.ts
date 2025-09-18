import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Folder } from '@users/materials/data-access-folders';

import { FoldersListVM } from './folders-list.interface';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter<Folder>();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(folder: Folder): void {
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(id: number): void {
    this.openFolder.emit(id);
  }
}
