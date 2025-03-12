import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IFolder } from '@users/materials/data-access';
import { formatDate } from '@users/core/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true}) folder!: IFolder;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();
  
  onDeleteFolder(event: Event, folder: IFolder ) {
    event.stopPropagation();
    this.deleteFolder.emit(folder);
  }
  
  onOpenFolder(folder: IFolder): void {
    console.log("aboba");
    this.openFolder.emit(folder.id);
  }
  
  public formatDate(time: number): string {
    return formatDate(time);
  }
}
