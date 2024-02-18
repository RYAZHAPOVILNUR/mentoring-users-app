import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ContentModel } from './content.model';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { SanitizerPipe } from '@users/materials/utils';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, PdfViewerModule, SanitizerPipe],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  public dialogData: ContentModel = inject(MAT_DIALOG_DATA);
  public title: string = '';
  public videoLink:string = '';
  ngOnInit(): void {
    this.initializeValues();
  }

  public initializeValues(): void {
    if (this.dialogData.contentType === 'youtube') {
      this.videoLink = this.dialogData.material_link.replace(/\/watch\?/, '/embed?');
    }
  }
}
