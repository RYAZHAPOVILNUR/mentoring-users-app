import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/data-access-folder';
import { Material, MaterialsFacade, MaterialType } from '@users/data-access-material';
import { filter, tap } from 'rxjs';

import { MaterialAddButtonComponent } from '../material-add-button/material-add-button.component';
import { MaterialListComponent } from '../material-list/material-list.component';
import { ConfirmMaterialDialogService } from '../ui/services/confirm-dialog.service';
import { MaterialDialogService } from '../ui/services/material-dialog.service';

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
  public readonly dialog = inject(MatDialog);
  public readonly foldersFacade = inject(FoldersFacade);
  public readonly materialsFacade = inject(MaterialsFacade);
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly materials$ = this.materialsFacade.materials$;
  public readonly confirmMaterialDialogService = inject(ConfirmMaterialDialogService);
  public readonly materialDialogService = inject(MaterialDialogService);

  ngOnInit(): void {
    this.foldersFacade.loadOpenedFolder();
    this.materialsFacade.loadMaterials();
  }

  public addMaterialClick(type: MaterialType): void {
    const dialogRef = this.materialDialogService.openCreateDialog(type);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((material) => this.materialsFacade.publishMaterial(material)),
      )
      .subscribe();
  }

  public viewMaterialClick(material: Material) {
    this.materialDialogService.openViewDialog(material);
  }

  public deleteMaterialClick(material: Material) {
    const dialogRef = this.confirmMaterialDialogService.openDeleteMaterialConfirmDialog(material);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.materialsFacade.deleteMaterial(material.id)),
      )
      .subscribe();
  }
}
