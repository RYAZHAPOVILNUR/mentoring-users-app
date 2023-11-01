import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMaterialsContentComponent } from '../users-materials-content/users-materials-content.component';
import { LetDirective } from '@ngrx/component';
import {
  MaterialsActions,
  MaterialsFacade,
} from '@users/materials/data-access';
import { map } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-users-materials-content-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersMaterialsContentComponent,
    LetDirective,
    MatProgressBarModule,
  ],
  templateUrl: './users-materials-content-container.component.html',
  styleUrls: ['./users-materials-content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsContentContainerComponent {
  public store = inject(Store);
  public materialsFacade = inject(MaterialsFacade);
  public status$ = this.materialsFacade.getStatus$;
  public materials$ = this.materialsFacade.getMaterials$;

  ngOnInit() {
    this.materialsFacade.getMaterials();
  }

  public openedFolder$ = this.materialsFacade.openedFolder$.pipe(
    map((folder) => {
      if (!folder) {
        this.store.dispatch(MaterialsActions.getFolderForRead());
      }
      return folder;
    })
  );
}
