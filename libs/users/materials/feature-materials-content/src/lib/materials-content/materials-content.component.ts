import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { materialsValidation } from 'libs/users/materials/data-access/src/lib/constants-enums/materials-validation';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
  public data: MaterialsType = inject(MAT_DIALOG_DATA);
  public materialsValidation = materialsValidation;

  public getVideoURL() {
    const id = this.data.material_link.match(materialsValidation.video);
    const trustedUrl = 'https://www.youtube.com/embed/';

    return id ? this.DomSanitizer.bypassSecurityTrustResourceUrl(trustedUrl + `${id[1]}`) : '';
  }
}