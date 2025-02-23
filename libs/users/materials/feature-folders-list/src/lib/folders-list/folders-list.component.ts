import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersVM } from '@users/materials/folders-vm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  public vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() editFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  public onDeleteFolder(dataForDeleteFolder: { folderId: number; folderTitle: string }) {
    this.deleteFolder.emit(dataForDeleteFolder);
  }

  public onEditFolder(folder: FoldersVM) {
    this.editFolder.emit(folder);
  }

  public onOpenFolder(folderSomeData: { folderId: number; folderTitle: string }) {
    this.openFolder.emit(folderSomeData);
  }
}
