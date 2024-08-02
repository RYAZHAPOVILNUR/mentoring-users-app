import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialType, regexMaterials } from '@users/materials/data-access';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  private readonly domSanitizer = inject(DomSanitizer);
  public readonly data: MaterialType = inject(MAT_DIALOG_DATA);
  public readonly regexMaterials = regexMaterials;

  public getVideoId() {
    const id = this.data.material_link.match(regexMaterials.video);
    const trustedUrl = 'https://www.youtube.com/embed/';

    return id ? this.domSanitizer.bypassSecurityTrustResourceUrl(trustedUrl + `${id[1]}`) : '';
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
