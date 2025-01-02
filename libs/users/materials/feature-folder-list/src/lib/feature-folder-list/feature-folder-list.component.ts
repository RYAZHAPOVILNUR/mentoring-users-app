import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-folder-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-folder-list.component.html',
  styleUrls: ['./feature-folder-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFolderListComponent {}
