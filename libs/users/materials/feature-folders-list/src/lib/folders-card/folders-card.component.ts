import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent{
  @Input({ required: true })
  folder!: Folder;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  public onDeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteFolder.emit(this.folder)
  }

  public onOpenFolder(event: Event) {
    this.openFolder.emit(this.folder.id)
  }
}
