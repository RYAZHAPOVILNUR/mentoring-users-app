import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMaterial } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsContentComponent } from '../../feature-materials-content/materials-content/materials-content.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  @Input({ required: true })
  material!: IMaterial;

  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material);
  }

  public dateFormat(time: number): string {
    const date = new Date(time);
    return `${date.getDate()} 
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} 
    ${date.getFullYear()}`;
  }

  public onOpenMaterial(material: IMaterial): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {
      data: { material },
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
