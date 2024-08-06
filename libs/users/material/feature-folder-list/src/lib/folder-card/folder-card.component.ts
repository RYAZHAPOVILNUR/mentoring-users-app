import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCardComponent {
  @Input() folder!: Folder;
  @Output() redirectMaterial = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();

  public onRedirectMaterial(): void {
    this.redirectMaterial.emit({ name: this.folder.title, id: this.folder.id });
  }

  public onDeleteFolder(): void {
    this.deleteFolder.emit(this.folder.id);
  }

  showDate() {
    return new Date(this.folder.created_at).toLocaleDateString();
  }
}
