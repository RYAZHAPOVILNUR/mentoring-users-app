import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialInterface } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoldersCardsDeleteDialogComponent } from '@feature-folders-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  deleteMaterialDialog(event: Event) {
    event.stopPropagation();
    const dialogRef: MatDialogRef<FoldersCardsDeleteDialogComponent> = this.dialog.open(
      FoldersCardsDeleteDialogComponent, {
        data: { material: this.material }
      });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
  }

  // openMaterialsList(folderId: number) {
  //   this.router.navigate(['/materials', folderId])
  // }
}
