import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { FileType, MaterialType } from '@users/settings/data-access';
import { CustomDatePipe } from '@users/settings/data-access';
import { MatButtonModule } from '@angular/material/button';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, CustomDatePipe, NgxExtendedPdfViewerModule]
})
export class MaterialsCardComponent implements OnInit {
  materialData!: MaterialType;
  materialType!: FileType;
  FileType = FileType;
  safeUrl!: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { materialId: number },
    private sanitizer: DomSanitizer,
    private store: Store
  ) { }

  getMaterial() {
    // this.store.dispatch(loadMaterial({ id: this.data.materialId }))
    // this.store.select(getMaterial)
    // .subscribe(data => {

    const data = { id: 761, created_at: 1715340044880, title: 'песня', material_link: 'http://www.sovmusic.ru/m32/hasta2.mp3', folder_id: 795 }
    // const data = { id: 761, created_at: 1715340044880, title: 'песня', material_link: 'https://bgu.ru/documents/Licen_10.03.2016.pdf', folder_id: 795 }
    // const data = { id: 761, created_at: 1715340044880, title: 'песня', material_link: 'https://youtu.be/5JoWghHNUFA?si=anwOONXtSwausCIk', folder_id: 795 }
    this.materialData = data;
    if (data.material_link.endsWith('.pdf')) {
      this.materialType = FileType.PDF;
    } else if (data.material_link.endsWith('.mp3')) {
      this.materialType = FileType.MP3;
    } else if (data.material_link.includes('youtu.be')) {
      this.materialType = FileType.VIDEO;
      const videoId = data.material_link.split('/').pop();
      const newUrl = `https://www.youtube.com/embed/${videoId}`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    }

    // });
  }

  ngOnInit(): void {
    this.getMaterial()
  }
}
