import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Material } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';

enum MaterialType {
  pdf = '.pdf',
  audio = '.mp3',
  youtube = 'youtube',
}

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly materialContent: Material = inject(MAT_DIALOG_DATA);
  public materialType!: MaterialType;

  ngOnInit(): void {
    const { material_link } = this.materialContent;
    if (material_link.endsWith(MaterialType.pdf)) {
      this.materialType = MaterialType.pdf;
    } else if (material_link.endsWith(MaterialType.audio)) {
      this.materialType = MaterialType.audio;
    } else {
      this.materialType = MaterialType.youtube;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public getVideoPreview(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialContent.material_link.match(youtubeRegex);

    const previewSrc = `https://img.youtube.com/vi/${match ? match[1] || match[2] : null}/maxresdefault.jpg`;
    return previewSrc;
  }
}
