import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'users-delete-button',
  imports: [CommonModule, MatIconButton, MatTooltip, MatIcon],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent {
  @Input() tooltipText = '';
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onButtonClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }
}
