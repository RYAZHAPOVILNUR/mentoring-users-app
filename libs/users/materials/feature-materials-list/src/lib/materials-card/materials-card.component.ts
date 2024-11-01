import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from '@users/materials';
import { LinkRegEx, MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MaterialsContentComponent],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: MaterialsVM;
  @Output() deleteMaterial = new EventEmitter<number>();
  public fileIcons: { [key: string]: string } = {
    video: 'movie',
    mp3: 'queue_music',
    pdf: 'picture_as_pdf'
  };

  getFileIcon(materialLink: string): string | null {
    if (LinkRegEx.VIDEO_REGEX.test(materialLink)) return this.fileIcons['video'];
    if (LinkRegEx.MP3_REGEX.test(materialLink)) return this.fileIcons['mp3'];
    if (LinkRegEx.PDF_REGEX.test(materialLink)) return this.fileIcons['pdf'];
    return null;
  }

  public onMaterialDelete(material: MaterialsVM): void {
    this.deleteMaterial.emit(material.id);
  }
}
