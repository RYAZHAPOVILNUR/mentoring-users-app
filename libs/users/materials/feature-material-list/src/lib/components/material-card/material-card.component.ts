import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Material } from 'libs/users/materials/data-access/src/lib/models/material.interface';
import { DeleteIconVisionDirective } from '../../../../../../shared/directives/delete-icon-vision.directive';
import { MaterialType } from 'libs/users/materials/feature-materials-create/src/lib/enums/material-type.enum';
import { MaterialValidationService } from 'libs/users/materials/feature-materials-create/src/lib/services/material-validation.service';
import { DoubleClickActionDirective } from 'libs/users/shared/directives/double-click-action.directive';

@Component({
  standalone: true,
  selector: 'users-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialValidationService],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    DeleteIconVisionDirective,
    DoubleClickActionDirective,
  ],
})
export class MaterialCardComponent {
  private readonly materialValidationService = inject(
    MaterialValidationService
  );

  @Input() material!: Material;
  @Output() deleteMaterial = new EventEmitter<number>();

  private readonly materialsIconMap = new Map<MaterialType, string>([
    [MaterialType.Video, 'video_library'],
    [MaterialType.Podcast, 'library_music'],
    [MaterialType.Pdf, 'picture_as_pdf'],
  ]);

  private get materialType() {
    return this.materialValidationService.getMaterialTypeByLink(
      this.material.material_link
    );
  }

  public get icon() {
    return this.materialsIconMap.get(this.materialType);
  }
}
