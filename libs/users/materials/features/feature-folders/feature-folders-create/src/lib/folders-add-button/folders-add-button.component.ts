import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-add-button',
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrl: './folders-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  @Output() openDialog = new EventEmitter<void>();

  onClick() {
    this.openDialog.emit();
  }
}
