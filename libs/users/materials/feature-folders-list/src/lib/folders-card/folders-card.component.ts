import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FoldersSecondModel } from '../../../../folders-model';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
@Input({ required: true })
folder!: FoldersSecondModel;

  @Output() deleteFolder = new EventEmitter();

  onDeleteFolder(folder: FoldersSecondModel) {
    this.deleteFolder.emit(folder);
  }

  dateFormat(time: string): string {
    const date = new Date(time);
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`
  }
}
