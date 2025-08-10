import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Folder } from '@users/data-access-folders';
@Component({
  selector: 'users-folders-card',
  imports: [CommonModule, DatePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folders-card.component.html',
  styleUrl: './folders-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  public readonly router = inject(Router);
  public isHovered = false;
  @Input() folder!: Folder;
  @Output() deleteFolder = new EventEmitter<Folder>();

  onDelete(folder: Folder) {
    this.deleteFolder.emit(folder);
  }

  goToMaterial() {
    this.router.navigate(['/materials', this.folder.id]);
  }
}
