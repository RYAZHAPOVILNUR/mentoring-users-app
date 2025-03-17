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
import { FoldersEntity, FoldersFacade, FoldersVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ShortTitle } from 'libs/users/materials/pipes/short-title.pipe';
import { CorrectDatePipe } from 'libs/users/materials/pipes/correct-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { DeleteFolderDialogComponent } from '../delete-folder-dialog/delete-folder-dialog.component';
import { MatButtonModule } from '@angular/material/button';

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
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);

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
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Deleted', result);
      }
    });
  }
}
