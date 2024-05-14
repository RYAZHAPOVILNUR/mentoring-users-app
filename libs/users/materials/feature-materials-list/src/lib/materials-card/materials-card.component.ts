import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDTO, OpenMaterialData } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

export const getMaterialIcon = (materialLink: string): string => {

  const materialExtension = materialLink.split('.').pop()?.toLowerCase();

  if (!materialLink) {
    return 'broken_image';
  }
  if (materialLink.includes('youtube' || 'video')) {
    return 'video_library'
  }
  if (materialExtension === ('mp4' || 'avi' || 'mov')) {
    return 'video_library';
  } else if (materialExtension === ('mp3' || 'wav' || 'mpeg' || 'ogg'
  )) {
    return 'library_music';
  } else if (materialExtension === 'pdf') {
    return 'picture_as_pdf';
  } else {
    return 'insert_drive_file';
  }
}

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,

  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsCardComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  @Input({ required: true }) material!: MaterialDTO;
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<OpenMaterialData>();

  ngOnInit(): void {
    const type = this.onGetMaterialIcon(this.material.material_link);
    this.material = { ...this.material, type };
  }

  onGetMaterialIcon(link: string): string {
    return getMaterialIcon(link)
  }

  onOpenMaterial() {
    this.openMaterial.emit({
      title: this.material.title,
      link: this.material.material_link.trim(),
      type: this.material.type!,
    })
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open
      (CoreUiConfirmDialogComponent, {
        data: {
          dialogText: 'Delete this material?'
        }
      })
    dialogRef.afterClosed().subscribe(result =>
      result && this.deleteMaterial.emit(id))
  }
}

