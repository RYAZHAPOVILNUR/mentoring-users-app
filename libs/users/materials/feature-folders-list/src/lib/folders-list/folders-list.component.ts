import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folders.type';

@Component({
  selector: 'users-folder-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToFolder = new EventEmitter();

  public onDeleteFolder(folder: FoldersVM) {
    this.deleteFolder.emit(folder);
  }

  public onRedirectToFolder(folder: FoldersType) {
    this.redirectToFolder.emit(folder.id);
  }
}
