import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '@users/materials-data-access';

@Component({
  selector: 'users-folder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input({ required: true }) public folder!: Folder;
  @Output() public readonly deleteFolderEmit: EventEmitter<{ id: number; title: string }> = new EventEmitter<{
    id: number;
    title: string;
  }>();

  public deleteFolder() {
    this.deleteFolderEmit.emit({ id: this.folder.id, title: this.folder.title });
  }
}
