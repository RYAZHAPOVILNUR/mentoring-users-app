// eslint-disable-next-line @nx/enforce-module-boundaries
import { MaterialsCreateButtonComponent } from './../../../../feature-materials-create/src/lib/materials-create-button/materials-create-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatProgressBarModule,
    MaterialsListComponent,
    MatIconModule,
    MatButtonModule,
    MaterialsCreateButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly router = inject(Router);

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly error$ = this.materialsFacade.error$;

  constructor() {
    this.materialsFacade.load();
  }

  public backOnFolders() {
    this.router.navigate([`/materials`]);
  }

  public deleteMaterial(folderId: number): void {
    this.materialsFacade.delete(folderId);
  }
}
