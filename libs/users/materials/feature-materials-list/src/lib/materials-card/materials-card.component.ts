import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from '@users/materials';
import { LinkRegEx } from '../../../../feature-materials-content/src/lib/materials-content/materials-content.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: MaterialsVM
  @Output() deleteMaterial = new EventEmitter<number>();
  public regEx = LinkRegEx;

  public onMaterialDelete(material: MaterialsVM): void {
    this.deleteMaterial.emit(material.id)
  }
}
