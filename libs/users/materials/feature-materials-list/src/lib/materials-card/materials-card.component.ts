import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  public hover = false;
  @Input()
  material!: Material;
  @Output()
  deleteMaterial = new EventEmitter<number>();

  onDeleteMaterial(id: number) {
    this.deleteMaterial.emit(id);
  }
}
