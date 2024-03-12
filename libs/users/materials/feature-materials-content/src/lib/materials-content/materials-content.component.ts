import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogTitle, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogRef } from '@angular/cdk/dialog';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private dialogRef = inject(DialogRef<MaterialsContentComponent>);
  public dialogData = inject(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer)
  public safe_link: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dialogData.material_link);

  public getYoutubeVideoId(): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = this.dialogData.material_link.match(regex);
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    return null;
  }
}
