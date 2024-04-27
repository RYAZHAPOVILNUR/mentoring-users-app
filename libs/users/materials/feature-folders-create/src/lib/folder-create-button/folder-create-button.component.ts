import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FolderCreateDialogComponent } from '../folder-create-dialog/folder-create-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folder-create-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folder-create-button.component.html',
  styleUrls: ['./folder-create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCreateButtonComponent {
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public openFolderCreateDialog(): void {
    const dialogRef: MatDialogRef<FolderCreateDialogComponent> = this.dialog.open(FolderCreateDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          console.log('result: ', result);
        }
      });
  }
}
