import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderDialogComponent } from '../add-folder-dialog/add-folder-dialog.component';
import { first, tap } from 'rxjs';
import { MaterialStateService } from '../../../../services/material-state.service';

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
  private readonly materialStateService = inject(MaterialStateService);

  public openCreateFolderDialog() {
    const dialogRef: MatDialogRef<AddFolderDialogComponent> = this.dialog.open(AddFolderDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        first(),
        tap((folderName: string) => {
          if (folderName) {
            this.materialStateService.updateAddFolder(folderName);
          }
        })
      )
      .subscribe();
  }
}