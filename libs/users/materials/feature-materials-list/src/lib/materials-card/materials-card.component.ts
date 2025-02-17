import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: MaterialDTO;

  readonly dialog = inject(MatDialog);

  openMaterial(material: MaterialDTO) {
    this.dialog.open(MaterialsContentComponent, {data: {material}});
  }

  @Output() deleteMaterial = new EventEmitter();
  onDeleteMaterial(): void {
    this.deleteMaterial.emit()
  }
}

