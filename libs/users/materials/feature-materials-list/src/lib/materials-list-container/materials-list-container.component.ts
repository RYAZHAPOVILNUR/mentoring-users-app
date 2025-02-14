import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { FoldersFacade, MaterialsFacade, MaterialsVM } from '@users/materials/data-access';
import { take } from 'rxjs';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsListContainerStore } from './materials-list-container.store';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MaterialsListComponent,
    MatButtonModule,
    MatIconModule,
    MaterialsAddButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore],
})
export class MaterialsListContainerComponent {
  private readonly router = inject(Router);
  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;
  public readonly selectedFolderTitle$ = this.foldersFacade.openedFolderTitle$;
  public readonly materials$ = this.materialsFacade.filteredMaterials$;

  constructor() {
    this.openedFolder$.pipe(take(1)).subscribe((folder) => {
      if (!folder) {
        this.foldersFacade.loadFolder();
        this.materialsFacade.loadMaterials();
      }
    });
  }

  public redirectToFolders() {
    this.router.navigate(['/materials']);
  }

  onDeleteMaterial(material: MaterialsVM) {
    this.componentStore.deleteMaterial(material);
  }
}
