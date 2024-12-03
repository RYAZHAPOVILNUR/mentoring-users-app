import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@users/materials/feature-materials-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent, LetDirective, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly materials$ = this.materialsFacade.filteredMaterials$;
  public readonly status$ = this.materialsFacade.materialsStatus$;
  public readonly errors$ = this.materialsFacade.materialsErrors$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  public onBackBtn() {
    this.router.navigate(['/materials']);
  }
}
