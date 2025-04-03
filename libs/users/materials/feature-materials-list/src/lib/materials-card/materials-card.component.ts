import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialsEntity, MaterialsVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { CorrectDatePipe, DefineMaterialTypePipe, MaterialType, ShortTitle } from '@users/feature-folders-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
import { AudioPlayerDialogComponent } from '../audio-player-dialog/audio-player-dialog.component';
import { VideoPlayerDialogComponent } from '../video-player-dialog/video-player-dialog.component';
import { DeleteFolderDialogComponent } from 'libs/users/materials/feature-folders-list/src/lib/delete-folder-dialog/delete-folder-dialog.component';
import { DeleteMaterialDialogComponent } from '../delete-material-dialog/delete-material-dialog.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    DefineMaterialTypePipe,
    CorrectDatePipe,
    MatButtonModule,
    MatCardModule,
    ShortTitle,
    MatDialogModule,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefineMaterialTypePipe],
})
export class MaterialsCardComponent {
  private dialog = inject(MatDialog);
  private materialTypePipe = inject(DefineMaterialTypePipe);

  @Input({})
  material!: MaterialsVM;

  onOpenMaterial(materialLink: string): void {
    const fileType = this.materialTypePipe.transform(materialLink);

    switch (fileType) {
      case MaterialType.AUDIO:
        this.dialog.open(AudioPlayerDialogComponent, { data: materialLink });
        break;
      case MaterialType.PDF:
        this.dialog.open(PdfViewerDialogComponent, { data: materialLink });
        break;
      case MaterialType.VIDEO:
      default:
        this.dialog.open(VideoPlayerDialogComponent, { data: materialLink });
        break;
    }
  }

  extractVideoId(url: string): string | null {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.dialog.open(DeleteMaterialDialogComponent, { data: this.material });
  }
}
