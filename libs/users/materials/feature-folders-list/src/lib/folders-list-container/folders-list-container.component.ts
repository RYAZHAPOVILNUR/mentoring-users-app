import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Store } from '@ngrx/store';
import { MaterialsActions, MaterialsStateInterface } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {

  private store$ = inject(Store<MaterialsStateInterface>);

  ngOnInit(): void {
    this.store$.dispatch(MaterialsActions.getFolders())
    this.store$.dispatch(MaterialsActions.getMaterials())
  }
}
