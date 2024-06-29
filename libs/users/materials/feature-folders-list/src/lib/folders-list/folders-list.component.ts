import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Folder } from '@users/users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true})
  vm!: FoldersListVM;

  @Output()
  deleteFolder = new EventEmitter();
  @Output()
  navigateToMaterials = new EventEmitter();

  onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }

  onNavigateToMaterials(id: number) {
    this.navigateToMaterials.emit(id);
  }
}
