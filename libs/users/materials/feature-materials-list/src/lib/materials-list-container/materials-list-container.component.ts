import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Material, MaterialsFacade } from '@users/materials-data-access';
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
  private readonly _router = inject(Router);
  private readonly _materialStateService: MaterialStateService = inject(MaterialStateService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dialog = inject(MatDialog);
  public readonly materialsFacade = inject(MaterialsFacade);

  ngOnInit() {
    this.materialsFacade.folderContent();
    this.materialsFacade.loadMaterials();
    this._subscribeToAddMaterial();
    this._subscribeToMaterialDelete();
  }

  public goBack() {
    this._router.navigate(['/materials']);
  }

  private _subscribeToAddMaterial() {
    this._materialStateService.addMaterial$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((material) => this.materialsFacade.addMaterial(material))
      )
      .subscribe();
  }

  private _subscribeToMaterialDelete() {
    this._materialStateService.deleteMaterial$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(({ id, title }) => this._openDeleteDialog({ id, title }))
      )
      .subscribe();
  }

  private _openDeleteDialog({ id, title }: Pick<Material, 'id' | 'title'>) {
    const dialogRef: MatDialogRef<DeleteMaterialDialogComponent> = this._dialog.open(DeleteMaterialDialogComponent, {
      data: { id, title },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((id) => {
          if (id) {
            this.materialsFacade.deleteMaterial(id);
          }
        })
      )
      .subscribe();
  }
}
