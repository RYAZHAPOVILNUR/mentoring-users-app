import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-button',
  imports: [CommonModule, MatMenuModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-add-button.component.html',
  styleUrl: './materials-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Output() openDialog = new EventEmitter<string>();

  chooseMaterialType(materialType: string) {
    this.openDialog.emit(materialType);
  }
}
