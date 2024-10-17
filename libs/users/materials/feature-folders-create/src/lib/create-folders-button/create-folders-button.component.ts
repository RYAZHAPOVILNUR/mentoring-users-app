import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateFoldersDialogComponent } from '../create-folders-dialog/create-folders-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { materialsFacade } from '@users/materials/data-access';
import { CreateFolderDTO } from '@users/core/data-access';

@Component({
  selector: 'users-create-folders-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CreateFoldersButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  private readonly materialsFacade = inject(materialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateFoldersDialogComponent> = this.dialog.open(CreateFoldersDialogComponent, {
      data: { name: this.name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolderData: CreateFolderDTO = {
            title: result.title,

          };

          this.materialsFacade.addFolder(newFolderData);
        }
      });
  }
}