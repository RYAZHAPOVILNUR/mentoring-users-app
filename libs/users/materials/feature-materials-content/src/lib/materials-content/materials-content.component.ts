import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent {
    constructor(
      @Inject(MAT_DIALOG_DATA) public readonly data: Material
    ){}
    private readonly sanitizer = inject(DomSanitizer)

    extractingIdVideo(){
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const poster = this.data.material_link.match(regExp);
      const videoUrl = (poster&&poster[7].length == 11)? poster[7] : false;

      if(videoUrl){
        return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ videoUrl)
      } else {
        return console.log('error')
      }
    }
}
