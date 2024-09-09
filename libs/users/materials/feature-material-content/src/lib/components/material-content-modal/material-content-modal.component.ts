import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialType } from 'libs/users/materials/feature-materials-create/src/lib/enums/material-type.enum';
import { MaterialContentModalData } from '../../services/material-content-modal.service';
import { MaterialContentAudioComponent } from '../material-content-audio/material-content-audio.component';
import { MaterialContentPdfComponent } from '../material-content-pdf/material-content-pdf.component';
import { MaterialContentVideoComponent } from '../material-content-video/material-content-video.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'users-material-content',
  templateUrl: './material-content-modal.component.html',
  styleUrls: ['./material-content-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MaterialContentAudioComponent,
    MaterialContentPdfComponent,
    MaterialContentVideoComponent,
  ],
})
export class MaterialContentModalComponent {
  public readonly dialogData: MaterialContentModalData =
    inject(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef);

  public readonly type: typeof MaterialType = MaterialType;
}
