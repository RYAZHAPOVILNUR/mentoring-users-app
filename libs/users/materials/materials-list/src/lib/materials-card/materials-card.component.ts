import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialDTO } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';
import { getFormattedDate } from '@users/materials/folder-list';
import { RevealMaterialData } from '@users/materials/data-access';

export const getMaterialIcon = (link: string): string => {
  if (!link) {
    return 'broken_image';
  }
  if(link.includes('yout') || link.includes('video')) return 'video_library';

  const extension = link.split('.').pop()?.toLowerCase();
  if (extension === 'mp4' || extension === 'avi' || extension === 'mov') {
    return 'video_library';
  } else if (extension === 'mp3' || extension === 'wav' || extension === 'ogg') {
    return 'library_music';
  } else if (extension === 'pdf') {
    return 'picture_as_pdf';
  } else {
    return 'insert_drive_file';
  }
}
@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent implements OnInit{
  private readonly dialog = inject(MatDialog);
  public parsedDate?: string;

  @Input({ required: true }) material!: MaterialDTO
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() revealMaterial = new EventEmitter<RevealMaterialData>();
  ngOnInit() {
    this.parsedDate = getFormattedDate(this.material.created_at)
    const type = this.onGetMaterialIcon(this.material.material_link);
    this.material = { ...this.material, type };
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      width: '350px',
      data: { dialogText: 'Вы хотите безвозвратно удалить этот материал?'}
    });

    dialogRef.afterClosed().subscribe(result =>
      result && this.deleteMaterial.emit(id))
  }

  onGetMaterialIcon(link: string): string {
    return getMaterialIcon(link);
  }

  onRevealMaterial() {
    this.revealMaterial.emit({
      title: this.material.title,
      link: this.material.material_link.trim(),
      type: this.material.type!
    })
  }
}
