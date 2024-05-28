import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials/materials.facade';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialCreate } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private materialsFacade = inject(MaterialsFacade);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  openDialog(materialType: string) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '270px',
      data: { type: materialType },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: MaterialCreate | undefined) => {
          if (result) {
            this.materialsFacade.createMaterial(result);
          }
        })
      )
      .subscribe();
  }
}
