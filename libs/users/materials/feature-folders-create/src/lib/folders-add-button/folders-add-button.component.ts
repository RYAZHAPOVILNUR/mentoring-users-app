import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TCreateFolderDTO } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'materials-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  @Output() sendNewFolder = new EventEmitter();

  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      width: '400px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((folder) => {
        if (folder) {
          const newFolderData: TCreateFolderDTO = {
            title: folder.title,
          };
          this.sendNewFolder.emit(newFolderData);
        }
      });
  }
}
