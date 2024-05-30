import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FoldersListUiComponent } from '@users/materials/feature-folders-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListUiComponent } from '../materials-list-ui/materials-list-ui.component';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    FoldersListUiComponent,
    MatButtonModule, MatIconModule,
    MaterialsListUiComponent
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  readonly materialsFacade = inject(MaterialsFacade);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.loadMaterialsByFolderId();
    this.deleteMaterialHandler();
  }

  private loadMaterialsByFolderId(): void {
    const paramsId: string | undefined = this.activatedRoute.snapshot.params['id'];
    if (!paramsId) return;

    const folderId = Number(paramsId);
    if (isNaN(folderId)) return;

    this.materialsFacade.loadMaterials(folderId);
  }

  deleteMaterialHandler(): void {
    this.materialsFacade.deleteMaterial$.pipe(
      tap((id) => this.materialsFacade.deleteMaterial(id)),
      takeUntilDestroyed()
    ).subscribe();
  }
}
