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
import { MaterialContentModalService } from 'libs/users/materials/feature-material-content/src/lib/services/material-content-modal.service';

@Component({
  standalone: true,
  selector: 'users-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialValidationService, MaterialContentModalService],
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
  private readonly materialContentModalService = inject(
    MaterialContentModalService
  );

  @Input() material!: Material;
  @Output() deleteMaterial = new EventEmitter<number>();

  private readonly materialsIconMap = new Map<MaterialType, string>([
    [MaterialType.Video, 'video_file'],
    [MaterialType.Podcast, 'music_video'],
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

  public showMaterialContentModal() {
    this.materialContentModalService
      .showMaterialContentModal({
        material: this.material,
        type: this.materialType,
      })
      .subscribe();
  }
}
