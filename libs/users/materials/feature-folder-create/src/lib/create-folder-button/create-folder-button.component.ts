import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-folder-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
})
export class CreateFolderButtonComponent {
  @Output() createFolder = new EventEmitter<void>();

  onCreateFolder(): void {
    this.createFolder.emit();
  }
}
