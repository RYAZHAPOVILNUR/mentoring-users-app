import { Component, OnInit, inject } from '@angular/core';
import { Material } from '../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VideoIdPipe } from './videoId.pipe';

@Component({
  selector: 'material-content',
  templateUrl: './materials-content.component.html',
  standalone: true,
  styleUrls: ['./materials-content.component.scss'],
  imports: [
    PdfViewerModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    VideoIdPipe,
  ],
  providers: [VideoIdPipe],
})
export class MaterialsContentComponent {
  private dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  dialogData: { material: Material } = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
