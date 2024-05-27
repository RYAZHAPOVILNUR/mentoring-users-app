import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsDTO } from '@users/core/data-access';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatDialogModule, MatIconModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly data: MaterialsDTO = inject(MAT_DIALOG_DATA);
  private readonly sanitazer = inject(DomSanitizer);

  public link = this.sanitazer.bypassSecurityTrustResourceUrl(
    this.data.material_link
  );

  public close(): void {
    this.dialogRef.close();
  }
}
