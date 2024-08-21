import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { CreateFoldersButtonComponent } from '@users/feature-folders-create';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, CreateFoldersButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListContainerComponent implements OnInit {
  ngOnInit(): void {
    this.FoldersFacade.init();
  }
  
  public FoldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.FoldersFacade.allFolders$;

  onDeleteFolder(folderId: number) {
    this.FoldersFacade.deleteFolder(folderId);
  }
}
