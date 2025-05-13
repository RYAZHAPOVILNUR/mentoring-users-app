import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialsType } from 'libs/users/materials/data-access/src/lib/models/materials.type';
import { regexMaterials } from 'libs/users/materials/data-access/src/lib/constant-enums/materials-regex';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
  public data: MaterialsType = inject(MAT_DIALOG_DATA);
  public regexMaterials = regexMaterials;

  public getVideoURL() {
    const id = this.data.material_link.match(regexMaterials.video);
    const trustedUrl = 'https://www.youtube.com/embed/';

    return id ? this.DomSanitizer.bypassSecurityTrustResourceUrl(trustedUrl + `${id[1]}`) : '';
  }
}
