import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { MaterialFacade } from '@users/materials/data-access';
import { MaterialListComponent } from '../material-list/material-list.component';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface MaterialListRouteParams {
  folderId: number;
}

@Component({
  standalone: true,
  selector: 'users-material-list-container',
  templateUrl: './material-list-container.component.html',
  styleUrls: ['./material-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetDirective, MaterialListComponent],
})
export class MaterialListContainerComponent {
  private readonly materialFacade = inject(MaterialFacade);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params
      .pipe(
        map((params) => Number((params as MaterialListRouteParams).folderId)),
        tap((folderId) => this.materialFacade.loadMaterials(folderId)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  public readonly materials$ = this.materialFacade.allMaterials$;
  public readonly status$ = this.materialFacade.status$;
  public readonly error$ = this.materialFacade.error$;
  public readonly openedFolder$ = this.materialFacade.openedFolder$;

  public onDeleteMaterial(id: number) {
    this.materialFacade.deleteMaterial(id);
  }
}
