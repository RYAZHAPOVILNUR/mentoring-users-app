import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as MaterialsActions from '../../../../data-access/src/lib/+state/materials.actions';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FoldersStateInterface } from '../../../../data-access/src/lib/+state/app-state.interface';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {

  private store$ = inject(Store<FoldersStateInterface>);

  ngOnInit(): void {
    this.store$.dispatch(MaterialsActions.getFolders())
  }
}
