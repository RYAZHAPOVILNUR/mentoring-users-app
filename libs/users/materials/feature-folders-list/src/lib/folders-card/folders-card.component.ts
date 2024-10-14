import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '../..';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FoldersEntity } from '@users/materials/data-access';


@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: FoldersVM;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  showDeleteButton = false;

  onDeleteFolder(event: Event, folder: FoldersEntity) {
    event.stopPropagation();
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(id: number) {
    this.openFolder.emit(id);
  }
}