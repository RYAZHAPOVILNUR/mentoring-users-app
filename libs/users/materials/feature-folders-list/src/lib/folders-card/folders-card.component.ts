import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FolderCardDeleteDialogComponent } from '../folder-card-delete-dialog/folder-card-delete-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
private router = inject(Router)
private destroyRef = inject(DestroyRef)
private readonly dialog = inject(MatDialog)

  @Input() folder!: Folder;
  @Output()
  deleteFolder = new EventEmitter<number>();

  showDelete = false

  onDeleteFolder(event: Event) {
    event.stopPropagation();
    const dialogRef: MatDialogRef<FolderCardDeleteDialogComponent> = this.dialog.open(FolderCardDeleteDialogComponent, {
      data: {folder: this.folder}})
      dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
  }

  openMaterial(folderId: number) {
    this.router.navigate(['/materials', folderId])
  }
}
