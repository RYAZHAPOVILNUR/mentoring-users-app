import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FoldersVM } from '@users/materials';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule, MatButtonModule, MatCardModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  public isFolderEmpty = true;

  @Input({ required: true }) folder!: FoldersVM;
  @Output() deleteFolder = new EventEmitter<number>();
  @Output() openFolder = new EventEmitter<number>();

  public onFolderDelete(folder: FoldersVM): void {
    this.deleteFolder.emit(folder.id);
  }
  public onFolderOpen(id: number): void {
    this.openFolder.emit(id)
  }
}
