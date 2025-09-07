import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Folder } from '@users/data-access-folder';
@Component({
  selector: 'users-folder-card',
  imports: [CommonModule, DatePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCardComponent {
  @Input({ required: true }) folder!: Folder;

  public readonly router = inject(Router);
  public isHovered = false;

  @Output() deleteClick = new EventEmitter<Folder>();

  onDeleteClick(folder: Folder) {
    this.deleteClick.emit(folder);
  }

  onCardClick() {
    this.router.navigate(['/materials', this.folder.id]);
  }
}
