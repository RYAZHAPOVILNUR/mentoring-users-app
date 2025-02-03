import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsService } from 'libs/users/materials/data-access/src/lib/services/materials.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly materialsService = inject(MaterialsService);

  public readonly src = this.data.material_link;
  public materialType: string = this.materialsService.getMaterialType(this.src);

  public getVideoId(): string {
    return this.data.material_link.split('v=')[1].split('&')[0];
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
