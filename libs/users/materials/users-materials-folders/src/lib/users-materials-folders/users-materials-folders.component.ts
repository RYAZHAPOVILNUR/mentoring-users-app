import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderDialogComponentComponent } from '../add-folder-dialog-component/add-folder-dialog-component.component';
import { MatCardModule } from '@angular/material/card';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-users-materials-folders',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NgFor,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatCardModule,
  ],
  templateUrl: './users-materials-folders.component.html',
  styleUrls: ['./users-materials-folders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsFoldersComponent {
  @Input() folders!: Folder[];

  @Output() addFolder = new EventEmitter<string>();
  @Output() deleteFolder = new EventEmitter<number>();
  @Output() setOpenedFolder = new EventEmitter<number>();

  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  deletedFolder(id: number) {
    this.deleteFolder.emit(id);
  }

  openedFolder(folderId: number) {
    this.setOpenedFolder.emit(folderId);
  }

  public openChangeTaskModal(): void {
    const dialogRef: MatDialogRef<AddFolderDialogComponentComponent> =
      this.matDialog.open(AddFolderDialogComponentComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((folderName) => !!folderName)
      )
      .subscribe((folderName) => this.addFolder.emit(folderName));
  }
}
