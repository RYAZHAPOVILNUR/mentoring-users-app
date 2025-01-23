import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '@users/feature-users-list';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'materials-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    CreateUsersButtonComponent,
    LetDirective,
    UsersListComponent,
    AsyncPipe,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.MaterialsFacade.status$;
  public readonly folders$ = this.MaterialsFacade.folders$;
  public readonly errors$ = this.MaterialsFacade.errors$;

  constructor() {
    this.MaterialsFacade.init();
  }
}
