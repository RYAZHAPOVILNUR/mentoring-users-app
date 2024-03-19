import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-material-content-pdf',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
  ],
  templateUrl: './material-content-pdf.component.html',
  styleUrls: ['./material-content-pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentPdfComponent {
  @Input({required:true}) 
  link!:string
}
