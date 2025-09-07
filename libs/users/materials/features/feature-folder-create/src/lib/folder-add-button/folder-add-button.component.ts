import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folder-add-button',
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folder-add-button.component.html',
  styleUrl: './folder-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
