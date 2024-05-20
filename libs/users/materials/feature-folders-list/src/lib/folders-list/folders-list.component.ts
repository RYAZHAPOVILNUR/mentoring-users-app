import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './materials-view-model';
import { FolderDTO } from '@users/core/data-access';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    PushPipe,
    MatProgressBarModule,
    FoldersCardComponent,
    FoldersAddButtonComponent,
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) vm!: FoldersListVM;
  @Output() FolderRedirect = new EventEmitter<FolderDTO>();
  @Output() AddFolderEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<FolderDTO>();

  public onFolderClick(folder: FolderDTO) {
    this.FolderRedirect.emit(folder);
  }

  public onAddFolderClick() {
    this.AddFolderEvent.emit();
  }

  public onDeleteClick(folder: FolderDTO) {
    this.deleteEvent.emit(folder);
  }
}
