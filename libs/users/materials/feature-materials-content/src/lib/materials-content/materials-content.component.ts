import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { regexMaterials } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    PdfViewerModule, 
    MatButtonModule
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  private sanitizer = inject(DomSanitizer);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public regexMaterials = regexMaterials;

  public materialLink: string = this.data.material.material_link;

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }

  // Функция для безопасной передачи URL
  getSanitizedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
