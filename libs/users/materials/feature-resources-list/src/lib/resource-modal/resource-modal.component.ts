import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { IMaterialModal } from '../../../../data-access/src/lib/models/models';
import { MATERIAL_ICONS } from '../../../../util/constant';
import { getPreviewLink } from '../../../../util/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-resource-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PdfViewerModule, NgxExtendedPdfViewerModule, NgOptimizedImage, MatButtonModule, MatIconModule],
  templateUrl: './resource-modal.component.html',
  styleUrls: ['./resource-modal.component.scss']
})
export class ResourceModalComponent {
  public readonly data: IMaterialModal = inject(MAT_DIALOG_DATA);
  public readonly materialLink: string = this.data.materialLink;
  public readonly materialType = this.data.materialType;
  public readonly materialTitle = this.data.materialTitle;
  public readonly MATERIAL_ICONS = MATERIAL_ICONS;
  public readonly previewImgLink = getPreviewLink(this.data);
}

