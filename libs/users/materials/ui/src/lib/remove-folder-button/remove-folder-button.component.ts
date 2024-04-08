import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'remove-folder-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './remove-folder-button.component.html',
  styleUrls: ['./remove-folder-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveFolderButtonComponent {
  @Output()
  removeHandler = new EventEmitter<void>();

  public onRemoveHandler() {
    this.removeHandler.emit();
  }
}
