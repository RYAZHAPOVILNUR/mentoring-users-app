import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVm } from '../../../../folders-vm';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) public folder!: FoldersVm;

  @Output() deleteFolder = new EventEmitter<{ folderId: number; folderTitle: string }>();
  @Output() editFolder = new EventEmitter<FoldersVm>();
  @Output() openFolder = new EventEmitter<{ folderId: number; folderTitle: string }>();

  onDeleteFolder() {
    this.deleteFolder.emit({ folderId: this.folder.id, folderTitle: this.folder.title });
  }

  onEditFolder() {
    this.editFolder.emit(this.folder);
  }

  onOpenFolder() {
    this.openFolder.emit({ folderId: this.folder.id, folderTitle: this.folder.title });
  }
}
