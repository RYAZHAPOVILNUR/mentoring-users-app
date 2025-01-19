import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialsEntity } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LetDirective } from '@ngrx/component';


@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatDialogModule,],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements AfterViewInit {
  dialog = inject(MatDialogRef<MaterialsContentComponent>);
  material: MaterialsEntity = inject(MAT_DIALOG_DATA).material;

  @ViewChild('pdfContainer') pdfContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.material?.type === 'pdf' && this.pdfContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = this.material.material_link;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.setAttribute('frameborder', '0');
      this.pdfContainer.nativeElement.appendChild(iframe);
    }
    if (this.material.type ==="audio" && this.pdfContainer) {
      const audio = document.createElement('audio');
      audio.src = this.material.material_link;
      audio.controls = true; // Добавление элементов управления
      audio.style.width = '100%'; // Задание ширины
      this.pdfContainer.nativeElement.appendChild(audio);
    }
    if(this.material.type === "video"){
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${this.extractYouTubeId(this.material.material_link)}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true; // Позволяет включать полноэкранный режим
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.setAttribute('frameborder', '0');
      this.pdfContainer.nativeElement.appendChild(iframe);
    }
  }

  private extractYouTubeId(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
}
