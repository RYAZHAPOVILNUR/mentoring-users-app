import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersVM } from '../../../../folders-vm';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folders-list-view-model';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  @Output()
  deleteFolder = new EventEmitter();
  @Output()
  openFolder = new EventEmitter<number>();

  public onDeleteFolder(folder: FoldersVM): void {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(folderId: number): void {
    this.openFolder.emit(folderId);
  }
}
