import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: Material;
  @Output() private readonly deleteMaterial = new EventEmitter<Material>();
  public readonly videoRegex = /^(youtu.be|youtube.com)/;
  public readonly audioRegex = /.mp3$/;
  public readonly pdfRegex = /.pdf$/;

  public onDelete(material: Material): void {
    this.deleteMaterial.emit(material);
  }
}
