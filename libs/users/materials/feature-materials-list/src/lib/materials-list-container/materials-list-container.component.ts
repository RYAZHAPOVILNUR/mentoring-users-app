import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
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
  public materialsFacade = inject(MaterialsFacade);
  public materials$ = this.materialsFacade.materials$;
  public status$ = this.materialsFacade.status$;
  public error$ = this.materialsFacade.error$;

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  public onDeleteMaterial(id: number): void {
    this.materialsFacade.deleteMaterial(id);
  }
}
