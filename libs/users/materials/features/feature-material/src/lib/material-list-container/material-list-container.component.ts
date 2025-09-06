import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { filter, tap } from 'rxjs';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { FoldersFacade } from '@users/data-access-folder';
import { CreateMaterial, Material, MaterialsFacade } from '@users/data-access-material';
import { MaterialContentComponent } from '@users/feature-material-content';
import {
  MaterialAddButtonComponent,
  MaterialAddDialogComponent,
  MaterialDialogService,
} from '@users/feature-material-create';

import { MaterialListComponent } from '../material-list/material-list.component';
export interface ResultDialogData {
  title: string;
  material_link: string;
}

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
  providers: [MaterialDialogService],
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
  public readonly dialogService = inject(MaterialDialogService);
  public readonly confirmDialogService = inject(ConfirmDialogService);
  ngOnInit(): void {
    this.foldersFacade.loadOpenedFolder();
    this.materialsFacade.loadMaterials();
  }

  public publishMaterial(materialType: string): void {
    const dialogRef = this.dialogService.open<MaterialAddDialogComponent, string, CreateMaterial>(
      MaterialAddDialogComponent,
      {
        data: materialType,
      },
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((material) => this.materialsFacade.publishMaterial(material)),
      )
      .subscribe();
  }

  public deleteMaterial(material: Material) {
    const dialogRef = this.confirmDialogService.open({
      title: `Вы уверены, что хотите удалить материал "${material.title}"?`,
      content: '',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.materialsFacade.deleteMaterial(material.id)),
      )
      .subscribe();
  }

  public viewMaterial(material: Material) {
    this.dialogService.open<MaterialContentComponent, Material>(MaterialContentComponent, { data: material });
  }
}
