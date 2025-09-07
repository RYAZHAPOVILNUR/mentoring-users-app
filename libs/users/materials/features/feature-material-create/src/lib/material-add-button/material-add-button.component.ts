import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { materialMenuItems } from '../configs/material-menu-items';

@Component({
  selector: 'users-material-add-button',
  imports: [CommonModule, MatMenuModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './material-add-button.component.html',
  styleUrl: './material-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddButtonComponent {
  public readonly materialMenuItems = materialMenuItems;
  @Output() addMaterialClicked = new EventEmitter<string>();

  selectMaterialType(materialType: string) {
    this.addMaterialClicked.emit(materialType);
  }
}
