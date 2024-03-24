import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialContentAudioComponent } from './material-content-audio/material-content-audio.component';
import { MaterialContentVideoComponent } from './material-content-video/material-content-video.component';
import { MaterialContentPdfComponent } from './material-content-pdf/material-content-pdf.component';
import { MaterialEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';
import { MaterialTypePipe } from './pipes/MaterialType.pipe';


@Component({
  selector: 'users-material-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PdfViewerModule,
    MatIconModule,
    MaterialContentAudioComponent,
    MaterialContentVideoComponent,
    MaterialContentPdfComponent,
    MaterialTypePipe
  ],
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentComponent {
  public data: { material:MaterialEntity } = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MaterialContentComponent>);



  public onClose(): void {
    this.dialogRef.close();
  }
  

}
