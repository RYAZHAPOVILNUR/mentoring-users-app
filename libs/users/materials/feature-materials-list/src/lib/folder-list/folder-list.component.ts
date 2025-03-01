import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderListVM } from './folder-list-view-model';
import { FoldersVM } from 'libs/users/materials/folder-vm';
import {FoldersCreateButtonComponent} from 'libs/users/materials/feature-create-materials/src/lib/create-folders-button/create-folders-button.component';


@Component({
  selector: 'folder-list-ui',
  standalone: true,
  imports: [CommonModule, FolderCardComponent, MatProgressBarModule, FoldersCreateButtonComponent],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent {
  @Input({ required: true })
  vm!: FolderListVM;

  @Output() deleteFolder= new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(folder: FoldersVM) {
    this.deleteFolder.emit(folder);
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }
}
