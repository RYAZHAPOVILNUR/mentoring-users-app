import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersAddButtonComponent } from "../folders-add-button/folders-add-button.component";
import { Folder } from '@users/materials/data-access';


@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input()
  folders!: Folder[];

  @Output() openFolder = new EventEmitter<number>()
  @Output() folderDeleted = new EventEmitter<Folder>()

  onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }

  deleteFolder(folder: Folder) {
    this.folderDeleted.emit(folder)
  }
}
