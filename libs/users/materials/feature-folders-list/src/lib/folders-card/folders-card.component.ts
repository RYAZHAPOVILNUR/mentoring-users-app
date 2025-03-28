import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TFolder } from '@users/materials/data-access';
import { formatDate } from '@users/core/utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  public folder!: TFolder;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  public onDeleteFolder(event: Event, folder: TFolder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(folder: TFolder): void {
    this.openFolder.emit(folder.id);
  }

  public formatDate(time: string) {
    return formatDate(time);
  }
}
