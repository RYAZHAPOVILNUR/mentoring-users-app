import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '@users/materials/feature-folders-create';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, FoldersAddDialogComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(MaterialsFacade)
  public folders$ = this.foldersFacade.allFolders$
  public status$ = this.foldersFacade.selectStatus$
  public errors$ = this.foldersFacade.selectErrors$
  public dialog = inject(MatDialog)
  
  constructor() {
    this.foldersFacade.init()
  }

  public onAddFolderClick() {
    console.log('add folder click')
    this.dialog.open(FoldersAddDialogComponent, {
      width: '300px',
      height: '200px'
    })
  }

}
