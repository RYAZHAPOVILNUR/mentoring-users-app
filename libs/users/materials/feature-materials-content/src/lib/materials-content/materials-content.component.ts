import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerComponent } from '@users/materials/feature-folders-list';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-content',
  standalone: true,
  imports: [CommonModule, FoldersListContainerComponent],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {}
