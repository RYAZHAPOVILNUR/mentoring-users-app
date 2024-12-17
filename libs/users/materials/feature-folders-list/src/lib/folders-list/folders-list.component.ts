import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { IFolder } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  public onDeleteFolder(folder: IFolder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}
