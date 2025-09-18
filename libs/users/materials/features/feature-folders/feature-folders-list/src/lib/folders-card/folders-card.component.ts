import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Folder } from '@users/materials/data-access-folders';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: Folder;
  @Output() deleteFolder = new EventEmitter<void>();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteFolder.emit();
  }

  onOpenFolder(): void {
    this.openFolder.emit(this.folder.id);
  }
}
