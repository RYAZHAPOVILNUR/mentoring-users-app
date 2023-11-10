import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FoldersSelectors, MaterialsActions} from '@users/materials/data-access'

import { MaterialsViewComponent } from "../materials-view/materials-view.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { LetDirective } from '@ngrx/component';
import { selectLoggedUserId } from '@auth/data-access';
@Component({
    selector: 'users-users-materials',
    standalone: true,
    templateUrl: './users-materials.component.html',
    styleUrls: ['./users-materials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, LetDirective, MatProgressBarModule, MaterialsViewComponent]
})
export class UsersMaterialsComponent {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(FoldersSelectors.selectFolders);
  public readonly status$ = this.store.select(FoldersSelectors.selectStatus);
  public readonly loggedUserId$ = this.store.select(selectLoggedUserId);
  constructor(){
    this.store.dispatch(MaterialsActions.loadFolder())
    console.log(this.store)
  }
}
