import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Material, regexFileType } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({required: true})
  material!: Material;
  @Output() backOnFolders = new EventEmitter<void>();
  @Output() deleteMaterial = new EventEmitter<Material>();

  public onDeleteMaterial(material: Material): void {
    this.deleteMaterial.emit(material);
  }

  public defineFileType(url: string) {
    switch (true) {
      case regexFileType.video.test(url):
        return 'video';
      case regexFileType.audio.test(url):
        return 'audio';
      case regexFileType.pdf.test(url):
        return 'pdf';
      default:
        return true;
    }
  }

  public dateFormat(time: string): string {
    const date = new Date(time);
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
  }
}
