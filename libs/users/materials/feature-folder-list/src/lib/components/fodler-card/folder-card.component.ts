import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { DeleteIconVisionDirective } from '../../../../../../shared/directives/delete-icon-vision.directive';
import { DoubleClickActionDirective } from '../../../../../../shared/directives/double-click-action.directive';

@Component({
  standalone: true,
  selector: 'users-folder-card[folder]',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    DeleteIconVisionDirective,
    DoubleClickActionDirective,
  ],
})
export class FolderCardComponent {
  @Input() public folder!: Folder;
  @Output() public readonly deleteFolder = new EventEmitter<number>();
  @Output() public readonly openFolder = new EventEmitter<Folder>();
}
