import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, PdfViewerModule, MatButtonModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  public materialLink: string = this.data.material.material_link;

  public playAudio(): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { material: this.data.material },
    });

    dialogRef.afterClosed().subscribe();
  }

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
