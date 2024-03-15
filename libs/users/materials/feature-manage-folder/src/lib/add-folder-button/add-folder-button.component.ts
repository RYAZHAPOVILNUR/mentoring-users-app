import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderDialogComponent } from '../add-folder-dialog/add-folder-dialog.component';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-add-folder-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './add-folder-button.component.html',
  styleUrls: ['./add-folder-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderButtonComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  @Output() public readonly createFolderEmit: EventEmitter<string> = new EventEmitter<string>();

  public openCreateFolderDialog() {
    const dialogRef: MatDialogRef<AddFolderDialogComponent> = this.dialog.open(AddFolderDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((folderName) => {
          if (folderName) {
            this.createFolderEmit.emit(folderName);
          }
        })
      )
      .subscribe();
  }
}
