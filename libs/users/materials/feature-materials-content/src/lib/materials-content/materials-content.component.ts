import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  // Функция для безопасной передачи URL
  getSanitizedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
