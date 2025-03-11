import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FolderAddDialogComponent } from '../folder-add-dialog/folder-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolderDTO, FoldersFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-folder-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFolderButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dialogref = inject(DestroyRef);
  private readonly folderfacade = inject(FoldersFacade);
  public readonly name = new FormControl(null);

  onFolderCreate(): void {
    const dialogRef = this.dialog.open(FolderAddDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.dialogref))
      .subscribe((result) => {
        if (result) {
          const newFolder: CreateFolderDTO = {
            title: result,
            createdAt: new Date().getTime(),
            id: new Date().getTime() + 12,
          };
          this.folderfacade.createFolder(newFolder);
        }
      });
  }
}
