import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMaterialListComponent } from "../user-material-list/user-material-lsit.component";
import { UserMaterialsFacade } from '@users/user-material-data-access';
import { MaterialsVM } from '../user-material-card/materials.vm';
import { MaterialListContainerStore } from './user-material.store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'user-materials-list-container',
  standalone: true,
  imports: [CommonModule, UserMaterialListComponent, MatButtonModule,
            MatDialogModule,
            LetDirective,],
  templateUrl: './user-material-list-container.component.html',
  styleUrls: ['./user-material-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialListContainerComponent {
  private readonly componentStore = inject(MaterialListContainerStore);
  public materialsFacade = inject(UserMaterialsFacade);
  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  @Input({required: true})
  folder_id?: number;

  public readonly filteredMaterials$ = this.materials$.pipe(
    map((materials) => materials.filter((material) => material.folder_id === this.folder_id))
  )

  public onDeleteMaterial(material: MaterialsVM) {
    this.componentStore.deleteMaterial(material);
  }

  public onOpenMaterial(id: number) {
  }
}
