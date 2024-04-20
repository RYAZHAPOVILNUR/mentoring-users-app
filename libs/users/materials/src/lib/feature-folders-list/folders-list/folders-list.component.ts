import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '../../feature-folders-create/folders-add-button/folders-add-button.component';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  imports: [CommonModule, FoldersAddButtonComponent, FoldersCardComponent],
})
export class FoldersListComponent {
  @Input({ required: true })
  folders!: IFolder[];

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder(folder: IFolder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}
