import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  @Input() folder!: IFolder;

  @Output() deleteFolderById = new EventEmitter();
  public deleteFolder(event: MouseEvent, folder: IFolder): void {
    event.stopPropagation();
    event.preventDefault();
    this.deleteFolderById.emit(folder);
  }
}
