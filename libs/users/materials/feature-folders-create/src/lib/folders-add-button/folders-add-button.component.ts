import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { addFolder, AddNewFolder, MaterialsFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private title!: string;
  public dialog = inject(MatDialog);
  private readonly facade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  addFolderDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      width: '450px',
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result?.title?.trim()) {
          const newFolderData: AddNewFolder = {
            title: result.title.trim(),
          };
          this.facade.addFolder(newFolderData);
        }
      });
  }
}
