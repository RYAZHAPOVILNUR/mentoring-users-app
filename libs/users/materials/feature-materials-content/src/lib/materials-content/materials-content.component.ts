import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PdfViewerModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly data = inject(MAT_DIALOG_DATA)
  public readonly title = this.data.material.title
  public readonly link = this.data.material.material_link

  onCloseMaterialFile(){}
}

