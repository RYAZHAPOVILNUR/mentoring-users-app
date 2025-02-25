import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewFolder, FoldersFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddButtonComponent {
  private title!: string;
  public dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  addFolderDialog() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(
      FoldersAddDialogComponent, {
        data: { title: this.title }
      }
    );
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      result => {
        if (result?.title?.trim()) {
          const newFolderData: AddNewFolder = {
            title: result.title.trim()
          };
          this.foldersFacade.addNewFolder(newFolderData);
        }
      }
    );
  }
}
