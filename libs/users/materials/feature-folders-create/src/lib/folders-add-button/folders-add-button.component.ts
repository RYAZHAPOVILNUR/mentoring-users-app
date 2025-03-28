import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly FoldersFacade = inject(FoldersFacade);

  public openAddFolderDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      height: '250px',
      width: '300px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result) {
          this.FoldersFacade.addFolder(result);
        }
      });
  }
}
