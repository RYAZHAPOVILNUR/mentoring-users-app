import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolder } from '@users/material';
import { FolderAddDialogComponent } from '../folder-add-dialog/folder-add-dialog.component';
import { MaterialFacade } from '@users/material';

@Component({
  selector: 'users-folder-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './folder-add-button.component.html',
  styleUrls: ['./folder-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddButtonComponent {
  public dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private materialFacade = inject(MaterialFacade);
  private title!: string;

  openCreateFolderDialog(): void {
    const dialogRef: MatDialogRef<FolderAddDialogComponent> = this.dialog.open(FolderAddDialogComponent, {
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data) {
          const folder: CreateFolder = {
            title: data.title,
          };

          this.materialFacade.createFolder(folder);
        }
      });
  }
}
