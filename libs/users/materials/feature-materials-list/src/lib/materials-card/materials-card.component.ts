import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialInterface } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoldersCardsDeleteDialogComponent } from '@feature-folders-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MaterialsCardDeleteDialogComponent
} from '../materials-card-delete-dialog/materials-card-delete-dialog.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material!: MaterialInterface

  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router)

  showDelete = false;

  get iconType(): string {
    const link = this.material.material_link?.toLowerCase() || '';
    if (link.includes('.pdf')) return 'description';
    if (link.includes('.mp3')) return 'audiotrack';
    if (link.includes('https://youtu')) return 'ondemand_video';
    return 'folder';
  }

  deleteMaterialFolderDialog(event: Event) {
    event.stopPropagation();
    const dialogRef: MatDialogRef<MaterialsCardDeleteDialogComponent> = this.dialog.open(
      MaterialsCardDeleteDialogComponent, {
        data: { material: this.material }
      });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
  }

  // openMaterialsList(folderId: number) {
  //   this.router.navigate(['/materials', folderId])
  // }
}
