import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PdfContentComponent } from './pdf-content/pdf-content.component';
import { MaterialType, MaterialsEntity } from '@users/users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PodcastContentComponent } from './podcast-content/podcast-content.component';
import { VideoContentComponent } from './video-content/video-content.component';
import { getMaterialType } from '@users/users/materials/utils';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    PdfContentComponent,
    PodcastContentComponent,
    VideoContentComponent,
  ],
  templateUrl: './materials-content-dialog.component.html',
  styleUrls: ['./materials-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentDialogComponent {
  public readonly material: MaterialsEntity = inject(MAT_DIALOG_DATA);
  public readonly materialType = getMaterialType(this.material.materialLink);
  public readonly materialTypes = MaterialType;
}
