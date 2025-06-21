import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsActions, MaterialsFacade } from '@users/materials/data-access';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { map } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsContentFeatureComponent } from '../materials-content-feature/materials-content-feature.component';

@Component({
  selector: 'lib-materials-content-container',
  imports: [CommonModule, MatProgressBarModule, MaterialsContentFeatureComponent, LetDirective],
  templateUrl: './materials-content-container.component.html',
  styleUrl: './materials-content-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentContainerComponent {
  ngOnInit() {
    this.materialsFacade.getMaterials();
  }

  public store = inject(Store);
  public materialsFacade = inject(MaterialsFacade);
  public status$ = this.materialsFacade.getStatus$;
  public materials$ = this.materialsFacade.getMaterials$;
  public openedFolder$ = this.materialsFacade.openedFolder$.pipe(
    map((folder) => {
      if (!folder) {
        this.store.dispatch(MaterialsActions.getFolderForRead());
      }
      return folder;
    }),
  );
}
