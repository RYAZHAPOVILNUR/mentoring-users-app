import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersSecondModel } from '../../../../folders-model';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
@Input({ required: true })
folders!: FoldersSecondModel[];

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();


  onDeleteFolder(folder: FoldersSecondModel) {
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}
