import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IMaterial } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  public data = inject<{ material: IMaterial }>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  ngOnInit(): void {
    console.log(this.data.material.material_link);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  // Извлекает превью YouTube-видео
  public getYoutubeThumbnail(link: string): string {
    let videoId = '';
    if (link.includes('youtube.com')) {
      const url = new URL(link);
      videoId = url.searchParams.get('v') || '';
    } else if (link.includes('youtu.be')) {
      videoId = link.split('/').pop() || '';
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
}
