import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YouTubeLinkImgPipe } from '../../pipes/you-tube-link-img.pipe';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    NgIf,
    YouTubeLinkImgPipe
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent{
  public readonly data = inject(MAT_DIALOG_DATA);
}
