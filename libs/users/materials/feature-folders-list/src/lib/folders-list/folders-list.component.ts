import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListVM, FoldersVM } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  onDeleteFolder(folder: FoldersVM) {
    this.deleteFolder.emit(folder);
  }

  onRedirectToMaterials(folderId: number) {
    this.redirectToMaterials.emit(folderId);
  }
}
