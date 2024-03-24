import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialFolderDialogComponent } from '../material-folder-dialog/material-folder-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-material-folder-add-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './material-folder-add-btn.component.html',
  styleUrls: ['./material-folder-add-btn.component.scss'],
})
export class MaterialFolderAddBtnComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)
  private readonly facade = inject(MaterialsFacade)

  openCreateNewFolderModal = () => {
    const dialogRef: MatDialogRef<MaterialFolderDialogComponent> =
      this.matDialog.open(MaterialFolderDialogComponent);
      dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean)
      )
      .subscribe((folderName: string) => this.facade.addNewFolder({title:folderName}))
  };
}
