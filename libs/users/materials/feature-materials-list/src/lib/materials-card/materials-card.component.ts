import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialDTO, OpenMaterialData } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,

  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsCardComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)

  @Input({ required: true }) material!: MaterialDTO;
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<OpenMaterialData>();

  ngOnInit(): void {
  }

  OpenMaterial(material: MaterialDTO): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, { data: { material } })
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open
      (CoreUiConfirmDialogComponent, {
        data: {
          dialogText: 'Delete this material?'
        }
      })
    dialogRef.afterClosed().subscribe(result =>
      result && this.deleteMaterial.emit(id))
  }
}

