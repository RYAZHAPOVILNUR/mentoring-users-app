import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials.facade';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  materialsFacade = inject(MaterialsFacade);
  materials$ = this.materialsFacade.materials$;
  status$ = this.materialsFacade.status$;

  constructor() {
    this.materialsFacade.loadMaterials();
  }
}
