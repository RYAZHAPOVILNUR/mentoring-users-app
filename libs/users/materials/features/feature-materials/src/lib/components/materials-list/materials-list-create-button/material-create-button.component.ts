import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

import { DialogData, MaterialType } from '@users/ui-materials';

@Component({
  selector: 'users-material-create-button',
  imports: [CommonModule, MatFabButton, MatIcon, MatMenu, MatMenuItem, MatTooltip, MatMenuTrigger],
  templateUrl: './material-create-button.component.html',
  styleUrl: './material-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCreateButtonComponent {
  private readonly materialTypes = MaterialType;
  readonly buttonsTypes = [
    { type: this.materialTypes.VIDEO, label: 'Видео' },
    { type: this.materialTypes.PDF, label: 'Файл PDF' },
    { type: this.materialTypes.AUDIO, label: 'Подкаст' },
  ];
  @Output() buttonClick = new EventEmitter<DialogData>();

  onButtonClick(materialTypes: MaterialType) {
    this.buttonClick.emit({ type: materialTypes });
  }
}
