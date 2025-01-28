import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TFoldersListVm, TFoldersVM } from '@users/materials/data-access';

@Component({
  selector: 'materials-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: TFoldersListVm;

  @Output() deleteFolder = new EventEmitter();

  public onDeleteFolder(folder: TFoldersVM): void {
    this.deleteFolder.emit(folder);
  }
}
