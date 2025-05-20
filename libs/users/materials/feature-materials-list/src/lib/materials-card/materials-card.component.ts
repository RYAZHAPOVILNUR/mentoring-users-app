import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsType } from '@users/materials/data-access';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({required: true})
  material!: MaterialsType
  
  @Output() deleteMaterial = new EventEmitter();

  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public onDeleteMaterial(material: MaterialsType) {
    this.deleteMaterial.emit(material)
  }
  
  public onOpenMaterial(material: MaterialsType): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog
    .open(
      MaterialsContentComponent, { data: { material } }
    )

    dialogRef
    .afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe()
  } 
}
