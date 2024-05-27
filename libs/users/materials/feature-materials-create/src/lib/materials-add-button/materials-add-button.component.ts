import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Output() addTypeEvent = new EventEmitter<string>();

  public openDialog(type: string): void {
    this.addTypeEvent.emit(type);
  }
}
