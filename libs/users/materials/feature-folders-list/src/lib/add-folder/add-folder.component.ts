import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDialogComponent } from '../folder-dialog/folder-dialog.component';

@Component({
  selector: 'users-add-folder',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderComponent {
  private title!: string;
  private created_at!: string;
  public dialog = inject(MatDialog);
  private readonly facade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FolderDialogComponent> = this.dialog.open(FolderDialogComponent, {
      data: { title: this.title, created_at: this.created_at },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolderData: Folder = {
            id: result.id,
            title: result.title,
            created_at: result.created_at,
          };
          this.facade.addFolder(newFolderData);
        }
      });
  }
}
