import { FoldersFacade } from '@users/materials/data-access';
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TFolderCreate } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  public openFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: TFolderCreate) => {
        if (result) {
          this.foldersFacade.createFolder({ title: result.title });
        }
      });
  }
}
