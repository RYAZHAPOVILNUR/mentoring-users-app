import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CreateUsersDialogComponent
} from '../../../users/feature-users-create/src/lib/create-users-dialog/create-users-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateUserDTO } from '../../../../core/data-access/src';
import { FoldersAddDialogueComponent } from '../folders-add-dialogue/folders-add-dialogue.component';
import { FoldersVM } from '../../folders-vm';
import { FoldersModel } from '../../folders-model';
import { UsersFacade } from '../../../users/data-access/src';
import { FoldersFacade } from '../../data-access/src/lib/+state/folders.facade';

@Component({
  selector: 'folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly foldersFacade = inject(FoldersFacade);
  private title!: string;
  private id!: string;

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogueComponent> = this.dialog.open(FoldersAddDialogueComponent, {
      data: { title: this.title, id: this.id },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.foldersFacade.addFolder(result);
        }
      });
  }
}
