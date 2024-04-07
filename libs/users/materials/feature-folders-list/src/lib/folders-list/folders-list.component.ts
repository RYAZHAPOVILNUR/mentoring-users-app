import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderListVM } from './folders-list-view-model';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    MatProgressBarModule,
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) vm!: FolderListVM;
  @Output() deleteFolder = new EventEmitter;
  @Output() redirectTo = new EventEmitter;

  onDeleteFolder(id: number){
    this.deleteFolder.emit(id);
  }
  onRedirectToFolder(folder: Folder){
    this.redirectTo.emit(folder)
  }
}
