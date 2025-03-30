import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListVM } from './folders-list-view-model';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersVM } from '@users/materials/data-access';


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
  public vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();

  public onDeleteFolder(folder: FoldersVM) {
    this.deleteFolder.emit(folder);
  }
}
