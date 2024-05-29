import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TFolderDTO } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { PushPipe } from '@ngrx/component';
import { TFolderListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    PushPipe,
    MatProgressBarModule,
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: TFolderListVM;
  @Output() deleteFolder = new EventEmitter<TFolderDTO>();

  public onDeleteFolder(folder: TFolderDTO) {
    this.deleteFolder.emit(folder);
  }
}
