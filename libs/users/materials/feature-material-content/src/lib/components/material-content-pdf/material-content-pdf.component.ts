import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  standalone: true,
  selector: 'users-material-content-pdf',
  templateUrl: './material-content-pdf.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PdfViewerModule],
})
export class MaterialContentPdfComponent {
  @Input() public pdfSrc: string = '';
}
