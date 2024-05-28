import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { FolderCreate } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private foldersFacade = inject(FoldersFacade);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  openDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      width: '270px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: FolderCreate) => {
          this.foldersFacade.createFolder(result);
        })
      )
      .subscribe();
  }
}
