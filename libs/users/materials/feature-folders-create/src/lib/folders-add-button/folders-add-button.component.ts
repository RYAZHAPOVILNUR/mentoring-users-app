import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FoldersFacade } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly foldersFacade = inject(FoldersFacade)
  openDialog() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: { dialogTitle: `Добавление новой папки` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formData) => {
        if (formData) {
          this.foldersFacade.addFolder(formData);
        }
      });
  }
}
