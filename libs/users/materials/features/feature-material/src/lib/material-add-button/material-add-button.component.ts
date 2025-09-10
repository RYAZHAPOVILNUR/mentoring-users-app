import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialType } from '@users/data-access-material';

export interface MaterialOption {
  type: MaterialType;
  label: string;
}

export const materialOptions: MaterialOption[] = [
  { type: 'video', label: 'Видео' },
  { type: 'pdf', label: 'Файл PDF' },
  { type: 'audio', label: 'Подкаст' },
];

@Component({
  selector: 'users-material-add-button',
  imports: [CommonModule, MatMenuModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './material-add-button.component.html',
  styleUrl: './material-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddButtonComponent {
  public readonly materialOptions = materialOptions;
  @Output() addMaterialClick = new EventEmitter<MaterialType>();

  onButtonClick(type: MaterialType) {
    this.addMaterialClick.emit(type);
  }
}
