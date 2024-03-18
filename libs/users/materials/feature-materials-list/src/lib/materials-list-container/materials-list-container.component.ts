import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Material, MaterialsFacade, materialsFeature } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { AddMaterialButtonComponent, DeleteMaterialDialogComponent } from '@users/feature-manage-material';
import { MaterialStateService } from '../../../../services/material-state.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    LetDirective,
    MatProgressBarModule,
    MaterialsListComponent,
    AddMaterialButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly loadingStatus$ = this.materialsFacade.loadingStatus$;
  public readonly currentFolder$ = this.materialsFacade.currentFolder$;
  public readonly currentFolderMaterials$ = this.materialsFacade.currentFolderMaterials$;
  private readonly materialStateService: MaterialStateService = inject(MaterialStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.materialsFacade.folderContent();
    this.materialsFacade.loadMaterials();
    this.subscribeToAddMaterial();
    this.subscribeToMaterialDelete();
  }

  public goBack() {
    this.router.navigate(['/materials']);
  }

  private subscribeToAddMaterial() {
    this.materialStateService.addMaterial$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((material) => this.materialsFacade.addMaterial(material))
      )
      .subscribe();
  }

  private subscribeToMaterialDelete() {
    this.materialStateService.deleteMaterial$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(({ id, title }) => this.openDeleteDialog({ id, title }))
      )
      .subscribe();
  }

  private openDeleteDialog({ id, title }: Pick<Material, 'id' | 'title'>) {
    const dialogRef: MatDialogRef<DeleteMaterialDialogComponent> = this.dialog.open(DeleteMaterialDialogComponent, {
      data: { id, title },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((id) => {
          if (id) {
            this.materialsFacade.deleteMaterial(id);
          }
        })
      )
      .subscribe();
  }
}
