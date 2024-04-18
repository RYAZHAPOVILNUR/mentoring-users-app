import { Component, ViewEncapsulation, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CreateMaterialsButtonComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialFacade = inject(MaterialsFacade);
  private dialog = inject(MatDialog);
  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateMaterialsDialogComponent> = this.dialog.open(CreateMaterialsDialogComponent, {
      data: {},
      width: '400px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((title) => {
        if (title) {
          const newData = {
            title,
          };
          this.materialFacade.onCreateFolder(newData);
        }
      });
  }
}
