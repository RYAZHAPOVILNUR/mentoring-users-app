import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeepReadonly } from '@users/core/utils';
import { IFolder } from "@users/materials/data-access";
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
  @Input({ required: true }) vm!: FoldersListVM;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();
  
  onDeleteFolder(folder: IFolder) {
    this.deleteFolder.emit(folder);
  }
  
  onOpenFolder(folder: IFolder) {
    this.openFolder.emit(folder.id);
  }
}
