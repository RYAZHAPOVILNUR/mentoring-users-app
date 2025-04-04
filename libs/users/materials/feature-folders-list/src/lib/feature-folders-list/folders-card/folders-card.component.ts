import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { FeatureFoldersListComponent } from "../feature-folders-list.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    FeatureFoldersListComponent,
    MatIconModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input() folder: Folder | undefined;
}
