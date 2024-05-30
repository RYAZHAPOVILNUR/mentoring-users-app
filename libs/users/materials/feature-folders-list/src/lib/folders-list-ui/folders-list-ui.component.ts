import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardUiComponent } from '../folders-card-ui/folders-card-ui.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardUiComponent, MatProgressBarModule],
  templateUrl: './folders-list-ui.component.html',
  styleUrls: ['./folders-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListUiComponent {
  @Input({ required: true }) folders!: Folder[];
  @Input({ required: true }) status!: string;
}
