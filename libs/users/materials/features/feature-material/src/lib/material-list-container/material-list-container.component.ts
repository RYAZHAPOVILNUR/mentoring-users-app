import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { filter, tap } from 'rxjs';

import { FolderFacade } from '@users/data-access-folder';
import { MaterialType, MaterialFacade, ViewMaterialData, DeleteMaterialData } from '@users/data-access-material';
import { MaterialAddButtonComponent, MaterialDialogService } from '@users/feature-material-create';

import { MaterialListComponent } from '../material-list/material-list.component';

@Component({
  selector: 'users-material-list-container',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MaterialAddButtonComponent,
    MaterialListComponent,
    LetDirective,
    MatProgressBarModule,
  ],
  providers: [],
  templateUrl: './material-list-container.component.html',
  styleUrl: './material-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListContainerComponent implements OnInit {
  private readonly folderFacade = inject(FolderFacade);
  private readonly materialFacade = inject(MaterialFacade);
  private readonly materialDialogService = inject(MaterialDialogService);

  public readonly materials$ = this.materialFacade.materials$;
  public readonly currentFolder$ = this.folderFacade.currentFolder$;
  public readonly status$ = this.materialFacade.status$;

  ngOnInit(): void {
    this.folderFacade.loadFolder();
    this.materialFacade.loadMaterials();
  }

  public addMaterial(type: MaterialType) {
    const dialogRef = this.materialDialogService.openAddDialog(type);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((material) => this.materialFacade.addMaterial(material)),
      )
      .subscribe();
  }

  public viewMaterial(material: ViewMaterialData) {
    this.materialDialogService.openViewDialog(material);
  }

  public deleteMaterial(material: DeleteMaterialData) {
    const dialogRef = this.materialDialogService.openDelete(material);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.materialFacade.deleteMaterial(material.id)),
      )
      .subscribe();
  }
}
