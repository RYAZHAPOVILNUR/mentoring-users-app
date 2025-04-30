import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { LetDirective } from '@ngrx/component';
import { RouterModule } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, LetDirective, RouterModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore],
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly materialsFacade = inject(MaterialsFacade);

  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly folderId$ = this.componentStore.folderId$;
  public readonly openedFolder$ = this.componentStore.openedFolder$;
}
