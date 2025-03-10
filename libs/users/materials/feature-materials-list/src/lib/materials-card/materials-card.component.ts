import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsDTO } from '@users/core/data-access';
import { MaterialTypePipe } from '../materialTypes/material-type.pipe';
import { materialTypes } from '../materialTypes/material-type';
import { MatDialog } from '@angular/material/dialog';
import localeRu from '@angular/common/locales/ru'; // Импортируйте данные русской локализации
import localeEn from '@angular/common/locales/en';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MaterialTypePipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material!: MaterialsDTO;
  @Input() lang!: string | null;

  @Output() deleteMaterial = new EventEmitter();
  protected readonly materialTypes = materialTypes;

  ondeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }

  constructor(private dialog: MatDialog) {
    registerLocaleData(localeRu, 'ru');
    registerLocaleData(localeEn, 'en');
  }

  openMediaDialog(material: any): void {
    const type = this.getMaterialType(material.material_link);
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { type: type, link: material.material_link },
    });
  }

  getMaterialType(link: string): string {
    if (link.endsWith('.pdf')) {
      return this.materialTypes.PDF;
    } else if (link.endsWith('.mp3')) {
      return this.materialTypes.AUDIO;
    } else {
      return this.materialTypes.VIDEO;
    }
  }
}
