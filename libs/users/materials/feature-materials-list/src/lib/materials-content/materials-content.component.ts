import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerComponent } from '@users/feature-folders-list';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, FoldersListContainerComponent],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {

  // Add this line to inject MaterialsFacade in the component.  // This allows the MaterialsFacade to be injected into the component and use its methods.  // If
}
