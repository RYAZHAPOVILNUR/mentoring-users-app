import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { FolderModel } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  @Input() folder?: FolderModel;
  get createAt(): Date | null {
    return this.folder?.create_at ? new Date(this.folder.create_at) : null;
  }
}
