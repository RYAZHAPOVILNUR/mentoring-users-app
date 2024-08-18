import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IMaterial } from '@users/materials/data-access';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MaterialsContentComponent } from '../../../../feature-materials-content/src/lib/materials-content/materials-content.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatIconModule, MatDialogModule],
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
