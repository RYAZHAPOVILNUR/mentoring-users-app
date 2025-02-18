import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MaterialsFacade, MaterialSelectors } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersListComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  store: Store = inject(Store)
  facade: MaterialsFacade = inject(MaterialsFacade)

  readonly folders$ = this.store.select(MaterialSelectors.selectFolders)
  readonly status$ = this.store.select(MaterialSelectors.selectStatus)

  constructor() {
    this.facade.initFolders()
  }
}
