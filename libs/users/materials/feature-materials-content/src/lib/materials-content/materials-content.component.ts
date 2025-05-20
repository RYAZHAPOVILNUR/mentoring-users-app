import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YoutubePipe } from './youtube.pipe';
import { UrlPipe } from './url.pipe';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule,  PdfViewerModule, YoutubePipe,  UrlPipe, MatDialogModule,],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  
  public data = inject(MAT_DIALOG_DATA)
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public materialLink: string = this.data.material.material_link;
  
  public onClose(): void {
    this.dialogRef.close();
  }
  
}
