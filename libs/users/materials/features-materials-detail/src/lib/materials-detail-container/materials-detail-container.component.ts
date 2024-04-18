import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MaterialsDetailCreateComponent } from '../materials-detail-create/materials-detail-create.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsDetailListComponent } from '../materials-detail-list/materials-detail-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-materials-detail-container',
  standalone: true,
  imports: [CommonModule, MaterialsDetailCreateComponent, MaterialsDetailListComponent, LetDirective],
  templateUrl: './materials-detail-container.component.html',
  styleUrls: ['./materials-detail-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDetailContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly materialFacade = inject(MaterialsFacade);
  public readonly materials$ = this.materialFacade.allMaterials$;
  public readonly error$ = this.materialFacade.error$;
  public readonly status$ = this.materialFacade.loaded$;

  ngOnInit(): void {
    this.materialFacade.initMaterials(this.route.snapshot.params['id']);
  }

  onDeleteMaterial(id: number) {
    this.materialFacade.onDeleteMaterial(id);
  }
}
