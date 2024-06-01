import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Store } from '@ngrx/store';
import { MaterialsStateInterface, selectAllFolders, MaterialsActions } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit{
  private readonly store$ = inject(Store<MaterialsStateInterface>);
  public readonly folders$ = this.store$.select(selectAllFolders);

  ngOnInit(): void {
    this.store$.dispatch(MaterialsActions.getFolders())
  }
}
