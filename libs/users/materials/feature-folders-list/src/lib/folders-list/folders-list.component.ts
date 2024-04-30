import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folder-list-view-model';
import { Folder } from '@users/materials/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input() vm!: FoldersListVM;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}
