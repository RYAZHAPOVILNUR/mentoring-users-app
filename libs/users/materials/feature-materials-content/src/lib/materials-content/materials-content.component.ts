import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  inject,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialsEntity } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LetDirective } from '@ngrx/component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatDialogModule, LetDirective],
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
    } else {
      console.warn('Material type is not PDF or container is missing.');
    }
  }
}
