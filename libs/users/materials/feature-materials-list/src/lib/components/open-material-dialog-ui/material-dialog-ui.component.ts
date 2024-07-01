import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { MaterialEntity } from '@users/materials/data-access';
import { MaterialIconPipe } from '../../pipes/material-icon.pipe';
import { MaterialIcon } from '../../enums/material-icon.enum';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TransformYoutubeLinkPipe } from '../../pipes/preview-maker-youtube.pipe';

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MaterialIconPipe,
    PdfViewerModule,
    NgSwitch,
    NgSwitchCase,
    TransformYoutubeLinkPipe,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './material-dialog-ui.component.html',
  styleUrls: ['./material-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialDialogUiComponent { // todo MaterialDialogUi
  readonly materialIcon = MaterialIcon;
  readonly material: MaterialEntity = inject(MAT_DIALOG_DATA);
  // todo управлять высотой отсюда
  // readonly matDialogRef = inject(MatDialogRef);

  // @ViewChild('pdf', { static: false }) content?: ElementRef;
  //@ViewChild(PdfViewerComponent, { static: false })
  //private pdfComponent?: PdfViewerComponent;

  //@ViewChild(PdfViewerComponent, { static: false, read: ElementRef })
  //private pdfEl?: ElementRef;

  // private readonly renderer = inject(Renderer2);

  // pageIsRendered() {
  //   this.matDialogRef.updateSize(
  //     `${this.pdfComponent!.pdfViewerContainer.nativeElement.scrollWidth + 24 + 24}px`,
  //     `${this.pdfComponent!.pdfViewerContainer.nativeElement.scrollHeight}px`
  //   );
  //   console.log('otsosal', this.pdfComponent!.pdfViewerContainer.nativeElement.clientWidth);
  //   console.log(this.content?.nativeElement?.offsetWidth);
  //   this.pdfComponent?.updateSize();
  //   this.renderer.setStyle(this.pdfEl!.nativeElement, 'height',
  //     this.pdfComponent!.pdfViewerContainer.nativeElement.scrollHeight + 'px');
  //   // this.pdfEl!.nativeElement.height =;
  //   // this.pdfComponent!.pdfViewer.currentScaleValue = 'page-fit';
  // }

}