import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersEntity, FoldersVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ShortTitle } from 'libs/users/materials/pipes/short-title.pipe';
import { CorrectDatePipe } from 'libs/users/materials/pipes/correct-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteFolderDialogComponent } from '../delete-folder-dialog/delete-folder-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { EditFolderDialogComponent } from '../edit-folder-dialog/edit-folder-dialog.component';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ShortTitle,
    CorrectDatePipe,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private readonly dialog = inject(MatDialog);

  @Input({ required: true })
  folder!: FoldersVM;

  @Output()
  redirectToFolder = new EventEmitter();

  onOpenFolder() {
    this.redirectToFolder.emit(this.folder);
  }

  onDeleteFolder(folder: FoldersEntity): void {
    const dialogRef = this.dialog.open(DeleteFolderDialogComponent, {
      data: folder,
      width: '700px',
    });
  }

  onEditFolder(folder: FoldersEntity): void {
    const dialogRef = this.dialog.open(EditFolderDialogComponent, {
      data: folder,
      width: '250px',
    });
  }
}
