import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderInterface, FoldersFacade } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FoldersCardsDeleteDialogComponent
} from '../folders-cards-delete-dialog/folders-cards-delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folders-cards.component.html',
  styleUrls: ['./folders-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardsComponent {
  @Input() folder!: FolderInterface;

  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router)

  showDelete = false;

  deleteFolderDialog(event: Event) {
    event.stopPropagation();
    const dialogRef: MatDialogRef<FoldersCardsDeleteDialogComponent> = this.dialog.open(
      FoldersCardsDeleteDialogComponent, {
        data: { folder: this.folder }
      });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
  }

  openMaterialsList(folderId: number) {
    this.router.navigate(['/materials', folderId])
  }
}
