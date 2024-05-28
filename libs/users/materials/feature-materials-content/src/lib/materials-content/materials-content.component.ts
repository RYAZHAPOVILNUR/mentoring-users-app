import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsDTO } from '@users/core/data-access';
import { MatButtonModule } from '@angular/material/button';
import { youtubeLinkParser } from './youtube-link-parser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly data: MaterialsDTO = inject(MAT_DIALOG_DATA);
  public readonly link = youtubeLinkParser(this.data.material_link);

  public close(): void {
    this.dialogRef.close();
  }
}
