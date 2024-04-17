import { Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { RemoveFolderButtonComponent } from '@users/materials/ui';
import { RemoveFolderDialogComponent } from '../remove-folder-dialog/remove-folder-dialog.component';

@Component({
  selector: 'folder-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatRippleModule, MatButtonModule, RemoveFolderButtonComponent],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
})
export class FolderCardComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

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

  public openFolderHandler(): void {
    this.router.navigateByUrl(`/materials/${this.folder.id}`);
  }
}
