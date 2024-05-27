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
import { DomSanitizer } from '@angular/platform-browser';
import {
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
} from 'ngx-extended-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    MatDialogModule,
    MatIconModule,
    NgxExtendedPdfViewerModule,
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
  private readonly sanitazer = inject(DomSanitizer);
  public readonly pdfViewer = inject(NgxExtendedPdfViewerService);

  public link = this.sanitazer.bypassSecurityTrustResourceUrl(
    this.data.material_link
  );

  constructor() {
    console.log(this.link);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
