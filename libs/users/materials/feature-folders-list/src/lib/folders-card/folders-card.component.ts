import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { limitSymbols } from '../../../../../../core/pipes/custom-pipes'
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folders.type';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, limitSymbols],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToFolder = new EventEmitter();
  
  public onDeleteFolder(event: Event) {
    this.deleteFolder.emit(this.folder);
  }
  
  public openFolder(folder: FoldersType): void {
    this.redirectToFolder.emit(folder.id)
  }

  public formatDate(time: number): string {
    const date = new Date(time);
    return `${date.getDate()} 
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} 
    ${date.getFullYear()}`;
  }
}
