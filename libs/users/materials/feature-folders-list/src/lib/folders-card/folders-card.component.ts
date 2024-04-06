import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatRippleModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  isDisplayRemoveIcon = false;

  @Input({ required: true })
  folder!: Folder;

  @Output()
  removeFolder = new EventEmitter<number>();

  public onRemoveFolder(): void {
    if (!this.folder.id) {
      return;
    }

    this.removeFolder.emit(this.folder.id);
  }

  public toggleRemoveIcon(): void {
    this.isDisplayRemoveIcon = !this.isDisplayRemoveIcon;
  }
}
