import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  @Input({ required: true })
  folderId!: number;

  openDialog(materialType: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { materialType },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const folder = { ...result, folder_id: this.folderId };
        // console.log(folder);
        this.materialsFacade.addMaterial(folder);
      });
  }
}
