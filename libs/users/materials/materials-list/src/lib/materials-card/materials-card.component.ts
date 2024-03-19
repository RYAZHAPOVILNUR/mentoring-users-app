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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export const getMaterialIcon = (link: string): string => {
  if (!link) {
    return 'broken_image';
  }
  if (link.includes('yout') || link.includes('video')) {
    return 'video_library';
  }

  const extensionToIcon: Record<string, string> = {
    'mp4': 'video_library',
    'avi': 'video_library',
    'mov': 'video_library',
    'mp3': 'library_music',
    'wav': 'library_music',
    'ogg': 'library_music',
    'pdf': 'picture_as_pdf'
  };
  const extension = link.split('.').pop()?.toLowerCase();
  return extensionToIcon[extension!] || 'insert_drive_file';
};

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  public parsedDate?: string;

  @Input({ required: true }) material!: MaterialDTO;
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() revealMaterial = new EventEmitter<RevealMaterialData>();

  ngOnInit(): void {
    this.parsedDate = getFormattedDate(this.material.created_at);
    this.material = { ...this.material, type: this.onGetMaterialIcon(this.material.material_link) };
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      width: '350px',
      data: { dialogText: 'Вы хотите безвозвратно удалить этот материал?' }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(),
      tap(result => result && this.deleteMaterial.emit(id))
    )
      .subscribe();
  }

  onGetMaterialIcon(link: string): string {
    return getMaterialIcon(link);
  }

  onRevealMaterial(): void {
    this.revealMaterial.emit({
      title: this.material.title,
      link: this.material.material_link.trim(),
      type: this.material.type!
    });
  }
}
