import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material, MaterialsFacade } from '@users/materials/interface';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
  MaterialsContentComponent
} from '../../../../../feature-materials-content/materials-content/materials-content.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material!: Material;
  private dialog = inject(MatDialog);
  materialsFacade = inject(MaterialsFacade);
  destroyRef = inject(DestroyRef);

  onMaterialDelete(materialId: number): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> =
      this.dialog.open(CoreUiConfirmDialogComponent,
        {data: {dialogText: `Вы уверены, что хотите удалить ${this.material.title}`}});
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if (result)
          this.materialsFacade.deleteMaterial(materialId);
      })
    ).subscribe(result => result);
  }
}
