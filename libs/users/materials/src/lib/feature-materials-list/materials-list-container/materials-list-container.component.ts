import { Component, OnInit, inject } from '@angular/core';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { CommonModule, Location } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddComponent } from '../../feature-materials-create/materials-add-btn/materials-add.component';
import {
  MaterialPostRequest,
  Material,
} from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MaterialsContentComponent } from '../../feature-materials-content/materials-content.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, first, map, scan, tap } from 'rxjs';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  templateUrl: './materials-list-container.component.html',
  providers: [MaterialsListContainerStore],
  imports: [
    CommonModule,
    MaterialsListComponent,
    MatIconModule,
    MaterialsAddComponent,
  ],
})
export class MaterialsListContainerComponent implements OnInit {
  private containerStore = inject(MaterialsListContainerStore);
  private readonly route = inject(ActivatedRoute);
  private readonly _location = inject(Location);
  public readonly materials$ = this.containerStore.materials$;
  public readonly isLoading$ = this.containerStore.isLoading$;
  public readonly folder$ = this.containerStore.folderTitle$;
  private dialog = inject(MatDialog);

  goBack() {
    this._location.back();
  }

  onSelectMaterial(id: number) {
    this.materials$
      .pipe(
        first(),
        map((materials) => materials.filter((material) => material.id === id)),
        tap((materials) =>
          this.dialog.open(MaterialsContentComponent, {
            data: {
              material:
                materials.length < 2 ? materials[0] : console.error('not unique id'),
            },
          })
        )
      )
      .subscribe();
  }

  onCreateNewMaterial(data: MaterialPostRequest) {
    this.containerStore.postMaterial(data);
  }

  onDeleteMaterial(id: number) {
    this.containerStore.deleteMaterial(id);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.containerStore.loadMaterials(+id);
      this.containerStore.loadFolder(+id);
    }
  }
}
