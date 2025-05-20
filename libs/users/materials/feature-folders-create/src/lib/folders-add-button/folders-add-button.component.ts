import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddFoldersType, FoldersFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  
  private readonly foldersFacade = inject(FoldersFacade);

  private readonly destroyRef = inject(DestroyRef);

  public dialog = inject(MatDialog);

  private folderTitle!: string;

  onAddFolder(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: { folderTitle: this.folderTitle },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolder: AddFoldersType = {
            title: result.folderTitle,
          };

          this.foldersFacade.addFolder(newFolder);
        }
      });
  }
}
