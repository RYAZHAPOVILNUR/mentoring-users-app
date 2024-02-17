import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentModel } from './content.model';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  public dialogData: ContentModel = inject(MAT_DIALOG_DATA);
  // testLink = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  // testLink = 'https://api.arya.ai/images/test.pdf';
  testLink = {
    url: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    withCredentials: true
  };
  ngOnInit(): void {
    if (this.dialogData.contentType === 'youtube') console.log('Its youtube');
    if (this.dialogData.contentType === 'pdf') console.log('Its pdf');
    if (this.dialogData.contentType === 'mp3') console.log('Its mp3');
    if (this.dialogData.contentType === 'other') console.log('I dont know what it is');
  }
}
