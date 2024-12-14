import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFoldersDialogComponent } from '../create-folders-dialog/create-folders-dialog.component';
import { CreateFolder, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-folders-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersButtonComponent {
  private title!: string;
  private readonly materialsFacade = inject(MaterialsFacade);
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public openAddMaterialDialog(): void {
    const dialogRef: MatDialogRef<CreateFoldersDialogComponent> = this.dialog.open(CreateFoldersDialogComponent, {
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterialData: CreateFolder = {
            title: result.title,
          };
          this.materialsFacade.addFolder(newMaterialData);
        }
      });
  }
}
