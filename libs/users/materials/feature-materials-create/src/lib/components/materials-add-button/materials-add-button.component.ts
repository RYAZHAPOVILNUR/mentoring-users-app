import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MaterialType } from '../../enums/material-type.enum';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'users-material-add-button',
  templateUrl: './materials-add-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
})
export class MaterialAddButtonComponent {
  @Output() public readonly optionSelected = new EventEmitter<MaterialType>();

  public readonly options = [
    {
      label: 'Видео',
      value: MaterialType.Video,
    },
    {
      label: 'Файл PDF',
      value: MaterialType.Pdf,
    },
    {
      label: 'Подкаст',
      value: MaterialType.Podcast,
    },
  ];
}
