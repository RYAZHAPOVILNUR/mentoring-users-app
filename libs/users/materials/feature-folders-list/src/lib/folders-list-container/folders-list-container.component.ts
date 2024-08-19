import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListContainerComponent  {

  public FoldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.FoldersFacade.allFolders$;
}
