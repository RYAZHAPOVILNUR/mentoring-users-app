import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Material } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { regexFileType, defineLinkType, MaterialFileType } from '@users/utils';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly data: Material = inject(MAT_DIALOG_DATA);
  public readonly MaterialFileType = MaterialFileType;
  public readonly defineLinkType = defineLinkType(this.data.material_link);

  public getVideoId() {
    const videoId = this.data.material_link.match(regexFileType.video);
    return videoId ? videoId[1] : null;
  }
}
