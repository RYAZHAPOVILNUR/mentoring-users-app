import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from "../folders-card/folders-card.component";
import { Folder } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create'

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    FoldersAddButtonComponent
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input() folders: Folder[] = [];
  @Output() deleteFolder = new EventEmitter<number>();

  onDeleteFolder(folderId: number):void {
    this.deleteFolder.emit(folderId);
  }
}
