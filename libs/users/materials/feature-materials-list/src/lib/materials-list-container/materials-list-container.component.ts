import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../..';
import { LetDirective } from '@ngrx/component';
import { CreateMaterialsButtonComponent } from '@users/feature-materials-create';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MaterialsListComponent, CreateMaterialsButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsListContainerComponent implements OnInit {
  ngOnInit(): void {
    this.MaterialsFacade.loadMaterials();
  }

  public MaterialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public readonly folders$ = this.MaterialsFacade.allFolders$;
  public readonly currentMaterials$ = this.MaterialsFacade.currentMaterials$;
  public readonly currentFolder$ = this.MaterialsFacade.currentFolder$;
  private readonly dialog = inject(MatDialog);
  public readonly foldersStatus = this.MaterialsFacade.status$;

  onDeleteMaterial(material: MaterialsEntity) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.MaterialsFacade.deleteMaterial(material.id);
      }
    });
  }

  public onBackToFolders(): void {
    this.router.navigate(['/materials']);
  }
}
