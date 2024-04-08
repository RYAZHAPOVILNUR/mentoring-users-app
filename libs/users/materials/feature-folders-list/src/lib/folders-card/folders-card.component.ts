import { Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { RemoveFolderButtonComponent, RemoveFolderDialogComponent } from '@users/materials/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatRippleModule, MatButtonModule, RemoveFolderButtonComponent],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);

  isDisplayRemoveIcon = false;

  @Input({ required: true })
  folder!: Folder;

  public removeFolderHandler(): void {
    const dialogRef = this.dialog.open(RemoveFolderDialogComponent, {
      maxWidth: '380px',
      width: '100%',
      data: { folderTitle: this.folder.title },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isRemoveFolder: boolean) => {
        if (isRemoveFolder) {
          this.materialsFacade.removeFolder(this.folder.id);
        }
      });
  }

  public toggleRemoveIcon(): void {
    this.isDisplayRemoveIcon = !this.isDisplayRemoveIcon;
  }
}
