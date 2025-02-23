import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@users/materials/feature-materials-create';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { MaterialsFacade } from '@libs/users/materials/state';
import { MaterialsEntity } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    CreateMaterialsButtonComponent,
    MatIconModule,
    MatButtonModule,
    LetDirective,
    RouterModule,
    MaterialsListComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  providers: [MaterialsListContainerStore],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);

  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly folderId$ = this.componentStore.folderId$;
  public readonly folderTitle$ = this.componentStore.folderTitle$;

  public onDeleteMaterial(dataForDeleteMaterial: { materialId: number; materialTitle: string }) {
    this.componentStore.deleteMaterial(dataForDeleteMaterial);
  }

  public onEditMaterial(material: MaterialsEntity) {
    this.componentStore.editMaterial(material);
  }

  public onOpenMaterial(materialId: number) {
    this.componentStore.openMaterial(materialId);
  }
}
