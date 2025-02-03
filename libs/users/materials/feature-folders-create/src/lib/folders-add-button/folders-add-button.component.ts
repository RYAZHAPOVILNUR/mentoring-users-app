import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsFacade } from '@users/materials/data-access';
import { IAddFolder } from 'libs/users/materials/data-access/src/lib/models/folder-add.model';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  public openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: IAddFolder) => {
        if (result && result.title) {
          const newFolder: IAddFolder = {
            title: result.title,
          };
          this.materialsFacade.addFolder(newFolder);
        }
      });
  }
}
