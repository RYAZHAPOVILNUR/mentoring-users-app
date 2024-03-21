import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials-data-access';
import { FolderComponent } from '../folder/folder.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FolderComponent, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) public folders: Folder[] = [];
}
