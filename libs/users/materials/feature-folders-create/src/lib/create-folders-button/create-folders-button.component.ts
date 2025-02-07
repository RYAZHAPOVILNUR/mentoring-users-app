import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFoldersDialogComponent } from '../create-folders-dialog/create-folders-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-folders-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  // private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateFoldersDialogComponent> = this.dialog.open(CreateFoldersDialogComponent, {
      data: { name: null },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          // const newFolderData = {
          //   name: result.name,
          //   email: result.email,
          //   purchaseDate: new Date().toString(),
          //   educationStatus: 'trainee',
          //   totalStoryPoints: 0,
          // };
          // this.foldersFacade.addFolder(newFolderData);
        }
      });
  }
}
