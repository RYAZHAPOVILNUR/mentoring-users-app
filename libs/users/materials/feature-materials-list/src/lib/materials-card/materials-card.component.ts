import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '@users/core/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Material } from '../../../../data-access/src/lib/models/material.models';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: Material;
  @Output() openMaterialEvent = new EventEmitter();
  @Output() deleteMaterialEvent = new EventEmitter();
  @Input({ required: true }) status!: LoadingStatus;

  openMaterial() {
    this.openMaterialEvent.emit(this.material);
  }

  deleteMaterial() {
    this.deleteMaterialEvent.emit(this.material);
  }
}
