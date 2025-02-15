import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade } from '@users/materials/data-access';
import { Store } from '@ngrx/store';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folders-list-view.model';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  constructor() {
    // console.log('folders-list', this.vm);
  }
}
