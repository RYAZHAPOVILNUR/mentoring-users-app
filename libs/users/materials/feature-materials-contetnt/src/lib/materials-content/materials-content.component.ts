import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsCardService } from '@users/materials/feature-materials-list';
import { IMaterial } from '@users/materials/data-access';
import { MaterialsContentVideoService } from './materials-content-video.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  private materialService = inject(MaterialsCardService);
  private videoService = inject(MaterialsContentVideoService);

  public material!: IMaterial;
  private youtubeUrl: string | null = null;
  private videoId: string | null = null;
  public thumbnailUrl: string | null = null;
  public pdfSrc!: string;

  ngOnInit() {
    this.materialService.material$.subscribe((material) => {
      this.material = material;
    });

    this.pdfSrc = this.material.material_link;
    this.youtubeUrl = this.material.material_link;
    this.videoId = this.videoService.getVideoId(this.youtubeUrl);
    if (this.videoId) {
      this.thumbnailUrl = this.videoService.getThumbnailUrl(
        this.videoId,
        'sddefault'
      );
    }
  }
}
