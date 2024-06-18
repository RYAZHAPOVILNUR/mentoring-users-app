import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: Folder;
  @Output() private readonly deleteFolder = new EventEmitter<Folder>();

  get formattedDate(): string {
    const date = new Date(this.folder.created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`; // (Month D, YYYY)
  }

  public onDelete(folder: Folder): void {
    this.deleteFolder.emit(folder);
  }
}
