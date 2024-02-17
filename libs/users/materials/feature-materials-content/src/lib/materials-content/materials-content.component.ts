import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ContentModel } from './content.model';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  public dialogData: ContentModel = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {
    if (this.dialogData.contentType === 'youtube') console.log('Its youtube');
    if (this.dialogData.contentType === 'pdf') console.log('Its pdf');
    if (this.dialogData.contentType === 'mp3') console.log('Its mp3');
    if (this.dialogData.contentType === 'other') console.log('I dont know what it is');
  }
}
