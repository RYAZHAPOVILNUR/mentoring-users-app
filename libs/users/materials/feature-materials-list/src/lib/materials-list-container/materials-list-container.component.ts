import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MaterialsFacade, materialsFeature } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { AddMaterialButtonComponent } from '@users/feature-manage-material';
import { MaterialStateService } from '../../../../services/material-state.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  ngOnInit(): void {
    this.materialsFacade.folderContent();
    this.materialsFacade.loadMaterials();
    this.subscribeToAddMaterial();
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
}
