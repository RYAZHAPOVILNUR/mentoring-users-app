import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersCardComponent } from '../../../../../users/feature-users-list/src/lib/users-card/users-card.component';
import { FoldersListVm } from './folders-list-vm';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';


@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule, UsersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVm;
  @Output() deleteFolderEvent = new EventEmitter()
  @Output() openFolderEvent = new EventEmitter()

  onDeleteFolder(id: number){
    this.deleteFolderEvent.emit(id)
  }

  onOpenFolder(id: number) {
    this.openFolderEvent.emit(id)
    console.log('id', id)
  }
}
