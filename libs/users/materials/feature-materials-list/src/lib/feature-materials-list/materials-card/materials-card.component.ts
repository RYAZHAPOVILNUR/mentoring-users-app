import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content'
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: 
  [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  public dialog = inject(MatDialog)
  @Input() material: Material | undefined;
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<number>();

  materialType: string | null = null;

  ngOnInit() {
    this.materialType = this.getMaterialType(this.material?.material_link); 
  }

  
  private getMaterialType(link: string | undefined): string | null {
    if (!link) return null;

    const lowercaseLink = link.toLowerCase();
    if (lowercaseLink.includes('youtube.com') || lowercaseLink.includes('youtu.be')) {
      return 'video';
    }
    if (lowercaseLink.endsWith('.pdf')) {
      return 'pdf';
    }
    if (lowercaseLink.endsWith('.mp3') || lowercaseLink.endsWith('.wav') || lowercaseLink.endsWith('.ogg')) {
      return 'audio';
    }
    return 'unknown';
  }

   openDialog(): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: {material: this.material}
    });

    dialogRef.afterClosed()
  }

   onDeleteMaterial(materialId?: number, event?: Event): void {
    event?.stopPropagation();
    this.deleteMaterial.emit(materialId);
  }
}
