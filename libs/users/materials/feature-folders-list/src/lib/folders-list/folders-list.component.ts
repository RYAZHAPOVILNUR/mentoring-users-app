import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeepReadonly } from '@users/core/utils';
import { FoldersEntity } from '@users/materials/data-access';
import { FoldersCardComponent } from "../folders-card/folders-card.component";

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListComponent {
  @Input({ required: true }) vm!: FoldersListVM;
  @Output() deleteFolder = new EventEmitter();

  onDeleteFolder(folderId: number) {
    this.deleteFolder.emit(folderId);
  }
}

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
}>;

export type FoldersVM = DeepReadonly<FoldersEntity>;