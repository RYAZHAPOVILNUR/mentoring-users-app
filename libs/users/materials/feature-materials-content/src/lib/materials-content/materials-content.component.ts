import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  public materialLink: string = this.data.material.material_link;

  public playAudio(): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { material: this.data.material },
    });

    dialogRef
    .afterClosed()
    .subscribe()
  }

  public getVideoId(): string | null {
    const url = new URL(this.materialLink);
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      return url.searchParams.get('v') || url.pathname.split('/')[1] || null;
    }
    return null;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}