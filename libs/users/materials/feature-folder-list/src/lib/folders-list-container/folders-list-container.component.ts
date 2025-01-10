import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFolderButtonComponent } from '@materials/feature-folders-create';
import {FoldersFacade} from '@users/materials/data-access';
import {FoldersListComponent} from '../folders-list/folders-list.component';

import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'users-folders-state-list-container',
  standalone: true,
  imports: [CommonModule, CreateFolderButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  foldersFacade: FoldersFacade = inject(FoldersFacade);
  folders$ = this.foldersFacade.allFolders$;

  ngOnInit() {
    this.foldersFacade.init();
    console.log(this.folders$);
  }
}
