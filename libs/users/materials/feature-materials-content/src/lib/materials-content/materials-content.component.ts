import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, YoutubePlayerComponent, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly videoId = new URL(this.data.material.material_link).searchParams.get('v');

  public onClose(): void {
    this.dialogRef.close();
  }
}
