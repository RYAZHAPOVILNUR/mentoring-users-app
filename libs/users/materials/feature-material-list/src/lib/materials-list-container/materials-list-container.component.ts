import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { MaterialListContainerStore } from './materials-list-container.store';
import { FoldersFacade } from '@users/materials/data-access';
import { MaterialsVM } from '../../../../vm/materials-vm';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, RouterLink, MatButtonModule, MatIconModule, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialListContainerStore]
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialListContainerStore);
  public foldersFacade = inject(FoldersFacade);
  public materials$ = this.componentStore.materials$;
  public status$ = this.componentStore.status$;
  private readonly router = inject(ActivatedRoute);
  public folderTitle!: string;
  public folderId!: number;

  constructor() {
    this.foldersFacade.loadFolders();
    this.loadMaterials();
  }

  public onDeleteMaterial(material: MaterialsVM): void {
    this.componentStore.deleteMaterial(material);
  }

  public loadMaterials(): void {
    this.router.paramMap.subscribe(params => {
      this.folderId = Number(params.get('id'));
      this.componentStore.filteredMaterials(this.folderId);
      const folder = this.foldersFacade.getFolderFromStore(this.folderId)
      folder.subscribe(result => {
        if (result) {
          this.folderTitle = result.title;
        }
      })
    })
  }
}
