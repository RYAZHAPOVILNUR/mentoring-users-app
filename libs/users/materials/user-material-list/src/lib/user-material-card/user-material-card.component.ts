import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MaterialEntity } from '@users/core/data-access';
import { MaterialsVM } from './materials.vm';
@Component({
  selector: 'material-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './user-material-card.component.html',
  styleUrls: ['./user-material-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialCardComponent {
  @Input({required: true})
  material!: MaterialsVM;
  
  @Output() deleteMaterial = new EventEmitter();
  public dateFormat(time: string): string {
    const date = new Date(parseInt(time));
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`
  }

  public onDeleteMaterial(material: MaterialEntity) {
    this.deleteMaterial.emit(material)
  }
}
