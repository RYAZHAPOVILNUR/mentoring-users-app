// import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MaterialInterface } from '@users/materials/data-access';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// // import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//
// @Component({
//   selector: 'users-materials-content',
//   standalone: true,
//   imports: [CommonModule, MatButtonModule, MatIconModule, NgxExtendedPdfViewerModule],
//   templateUrl: './materials-content.component.html',
//   styleUrls: ['./materials-content.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class MaterialsContentComponent {
//   isPdf: boolean;
//   isMp3: boolean;
//   isYoutube: boolean;
//   safeYoutubeUrl: SafeResourceUrl | null = null;
//
//   constructor(
//     public dialogRef: MatDialogRef<MaterialsContentComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { material: MaterialInterface },
//     private sanitizer: DomSanitizer
//   ) {
//     const link = data.material.material_link.toLowerCase();
//     this.isPdf = link.includes('.pdf');
//     this.isMp3 = link.includes('.mp3');
//     this.isYoutube = link.includes('https://youtu');
//
//     if (this.isYoutube) {
//       this.safeYoutubeUrl = this.sanitizeYoutubeUrl(link);
//     }
//   }
//
//   private sanitizeYoutubeUrl(url: string): SafeResourceUrl {
//     // Преобразование ссылки в формат, который поддерживает iframe
//     const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
//     return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
//   }
//
//   cancel() {
//     this.dialogRef.close();
//   }
// }
