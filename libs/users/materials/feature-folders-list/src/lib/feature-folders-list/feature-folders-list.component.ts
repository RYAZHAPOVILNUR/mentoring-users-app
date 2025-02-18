import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '@users/materials/data-access';

@Component({
  selector: 'users-feature-folders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-folders-list.component.html',
  styleUrls: ['./feature-folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersListComponent {}
