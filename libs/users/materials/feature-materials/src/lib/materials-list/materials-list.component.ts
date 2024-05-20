import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MaterialsListVM } from './materials-list-view-model';
import { Material } from '@users/materials/data-access';

import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsCardComponent } from '../material-card/materials-card.component';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'materials-list-ui',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input() vm!: MaterialsListVM;
  @Output() deleteMaterial = new EventEmitter();

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public onDeleteMaterial(material: Material): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((isConfirmed) => {
          if (isConfirmed) this.deleteMaterial.emit(material.id);
        })
      )
      .subscribe();
  }
}
