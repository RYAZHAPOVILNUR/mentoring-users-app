import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    NgIf
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent implements OnInit{
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  get ytLink() {
    if (this.data.material_link.includes('youtube'))
    return '//img.youtube.com/vi/' + this.data.material_link.split('=')[1].split('&')[0] + '/maxresdefault.jpg'
  else return ''
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%')      
  }
}
