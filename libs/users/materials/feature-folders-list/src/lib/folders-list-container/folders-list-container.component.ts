import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { FoldersListContainerStore } from './folders-list-container.store';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '../../../../../users/feature-users-list/src';
import { FoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  selector: 'folders-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, LetDirective, UsersListComponent, FoldersListComponent,NgFor],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly foldersFacade = inject(FoldersFacade);

  private readonly componentStore = inject(FoldersListContainerStore);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.foldersFacade.init();
  }
}
