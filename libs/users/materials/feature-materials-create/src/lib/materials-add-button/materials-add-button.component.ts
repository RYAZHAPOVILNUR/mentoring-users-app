import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  onAddMaterial(materialType: string) {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {data: materialType})

    dialogRef 
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))  
      .subscribe(
        (newMaterial) => {
          if (newMaterial) {
            this.materialsFacade.addMaterial(newMaterial);
          }
        }
    )
  }
}
