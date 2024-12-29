import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { formatDate } from 'libs/core/utils/src/lib/date-utils';
import { FoldersType } from 'libs/users/materials/data-access/src/lib/models/folder.type';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { limitSymbols } from '../../../../../../core/pipes/custom-pipes';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, limitSymbols],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToFolder = new EventEmitter();

  @Input({ required: true })
  public folder!: FoldersVM;
  
  public onDeleteFolder(event: Event) {
    this.deleteFolder.emit();
  }
  
  public openFolder(folder: FoldersType): void {
    this.redirectToFolder.emit(folder.id)
  }

  public formatDate(time: number): string {
    return formatDate(time); 
  }
}