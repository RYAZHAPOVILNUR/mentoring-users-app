import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) folders!: Folder[];
  @Input({ required: true }) status!: string;
  @Output() renameFolder = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();



  onRenameFolder(folder: Folder) {
    this.renameFolder.emit(folder);
  }
  onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }






}
