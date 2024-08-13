import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({required: true})
  material!: Material;

  pickIcon() {
    if(this.material.material_link.endsWith('.pdf')) {
      return 'picture_as_pdf'
    }
    if(this.material.material_link.endsWith('.mp3')) {
      return 'audio_file'
    }
    return 'ondemand_video'
  }
}
