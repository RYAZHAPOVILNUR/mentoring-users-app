import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule, MatButtonModule, MatCardModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  public isFolderEmpty = true

  @Input({required: true}) folder!: IFolder;
  @Output() deleteFolderEvent = new EventEmitter<number>();

  public onFolderDelete(folder: IFolder): void {
    this.deleteFolderEvent.emit(folder.id)
  }
}
