import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';
import { MaterialTypePipe } from '../../../../util/pipes/material-type.pipe';
import { materialTypes } from '../../../../util/materialTypes/material-type';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() lang!: string | undefined;

  @Output() deleteMaterial = new EventEmitter();
  protected readonly materialTypes = materialTypes;

  ondeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }


  constructor(private dialog: MatDialog) {}

  openMediaDialog(material: any): void {
    const type = this.getMaterialType(material.material_link);
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { type: type, link: material.material_link },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Модальное окно закрыто');
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
