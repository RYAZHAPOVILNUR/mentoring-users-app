import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: Material;
  @Output() deleteMaterial = new EventEmitter();

  public readonly dialog = inject(MatDialog);

  public openMaterial(): void {
    this.dialog.open(MaterialsContentComponent, {
      data: this.material,
    });
  }

  public dateFormat(time: number): string {
    const date = new Date(time);
    const formattedDate = `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
    return formattedDate;
  }
  public handleDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit(this.material);
  }
}
