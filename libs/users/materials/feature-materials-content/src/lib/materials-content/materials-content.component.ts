import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TMaterial, materialsValidation } from '@users/materials/data-access';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly DomSanitizer = inject(DomSanitizer);
  public data: TMaterial = inject(MAT_DIALOG_DATA);
  public materialsValidation = materialsValidation;

  public getVideoUrl() {
    const id = this.data.material_link.match(materialsValidation.video);
    const trustedUrl = `https://www.youtube.com/embed/`;

    return id ? this.DomSanitizer.bypassSecurityTrustResourceUrl(`${trustedUrl}${id[1]}`) : '';
  }
}
