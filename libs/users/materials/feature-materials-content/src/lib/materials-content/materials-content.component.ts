import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PdfViewerModule, MatButtonModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);

  getSanitizedUrl(url: string) {
  console.log(url);
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}