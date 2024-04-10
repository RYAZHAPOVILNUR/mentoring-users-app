import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Folder } from '@users/materials/data-access';
import { FolderCardComponent } from '../folders-card/folder-card.component';

@Component({
  selector: 'materials-folders-list',
  standalone: true,
  imports: [CommonModule, FolderCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  @Input({ required: true })
  folders!: Folder[];
}
