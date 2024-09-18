import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserDTO } from '@users/core/data-access';
import { MaterialsViewerComponent } from '../materials-viewer/materials-viewer.component';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsCardComponent {
  @Input({ required: true }) material!: MaterialsVM;
  @Output() deleteMaterial = new EventEmitter();
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  showDeleteButton = false;

  onDeleteMaterial(event: Event, materialId: number) {
    event.stopPropagation();
    this.deleteMaterial.emit(materialId);
  }

  getFileType = (url: string) => {
    if (url.endsWith('pdf')) {
      return 'picture_as_pdf';
    } else if (url.endsWith('mp3')) {
      return 'queue_music';
    } else if (url.includes('youtube.com')) {
      return 'movie';
    }
    return 'question_mark';
  };

  openMaterialViewer(): void {
    const dialogRef: MatDialogRef<MaterialsViewerComponent> = this.dialog.open(MaterialsViewerComponent, {
      data: this.material,
    });
  }
}
