import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFolderButtonComponent } from '@materials/feature-folders-create';
import {FoldersFacade} from 'libs/users/materials/data-access/src/lib/folders-state/folders.facade';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, CreateFolderButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {

  foldersFacade: FoldersFacade = inject(FoldersFacade)

  ngOnInit() {
    this.foldersFacade.init()
  }
}
