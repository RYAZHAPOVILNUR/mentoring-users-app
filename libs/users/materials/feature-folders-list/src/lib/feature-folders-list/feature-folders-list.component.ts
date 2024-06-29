import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-folders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-folders-list.component.html',
  styleUrls: ['./feature-folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersListComponent {}
