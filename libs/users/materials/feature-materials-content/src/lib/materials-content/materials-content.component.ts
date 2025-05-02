import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YoutubePipe } from "./youtube.pipe";
import { UrlPipe } from "./url.pipe"; 

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,
    MatIconModule, 
    MatButtonModule, 
    PdfViewerModule, 
    YoutubePipe, 
    UrlPipe
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA) || {
    material: {
      material_link: 'https://www.youtube.com/watch?v=XYZ123',
    },
  };
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public materialLink: string = this.data.material.material_link;

  public playAudio(): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { material: this.data.material },
    });

    dialogRef
    .afterClosed()
    .subscribe()
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
