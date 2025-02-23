import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { isAudio, isPdf, isVideo } from '@users/core/utils';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule,MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input()
  material!: Material;

  @Output()
  deleteMaterial = new EventEmitter()
  
  isAudio(link: string) {
    return isAudio(link);
  }

  isPdf(link: string) {
    return isPdf(link);
  }

  isVideo(link: string) {
    return isVideo(link);
  }

  onDeleteMaterial(material: Material) {
    this.deleteMaterial.emit(material)
  }
}