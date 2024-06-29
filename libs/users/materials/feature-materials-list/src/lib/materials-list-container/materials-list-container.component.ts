import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsEntity } from '@users/users/materials/data-access';
import { CreateMaterialsButtonComponent } from '@users/users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    PushPipe,
    MaterialsListComponent,
    LetDirective,
    CreateMaterialsButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore],
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);
  public readonly openedFolder$ = this.componentStore.openedFolder$;
  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly error$ = this.componentStore.error$;

  onMoveBack() {
    this.componentStore.moveBack();
  }

  onOpenMaterial(material: MaterialsEntity) {
    this.componentStore.openMaterial(material);
  }

  onDeleteMaterial(material: MaterialsEntity) {
    this.componentStore.deleteMaterial(material);
  }
}
