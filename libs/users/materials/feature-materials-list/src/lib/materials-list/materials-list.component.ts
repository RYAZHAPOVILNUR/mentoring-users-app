import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity, MaterialsErrors, MaterialsFacade } from '@users/materials/data-access';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { LetDirective } from '@ngrx/component';
import { MaterialsListVM } from './materials-list-view.module';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, LetDirective],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly materialsFacede = inject(MaterialsFacade);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  public materials$!: MaterialsEntity;

  // @Input({ required: true })
  // vm!: MaterialsListVM;

  // public readonly folder$: Observable<MaterialsEntity | null> = this.materialsFacede.openedMaterial$.pipe(
  //   tap((material) => {
  //     if (!material) {
  //       console.log('Material List>>', material);
  //       this.materialsFacede.loadMaterials();
  //     } else {
  //       console.log('Material List>><<', material);
  //       this.material = material;
  //     }
  //   })
  // );

  public readonly status$ = this.materialsFacede.status$;
  public readonly errors$: Observable<MaterialsErrors | null> = this.materialsFacede.errors$;
}
