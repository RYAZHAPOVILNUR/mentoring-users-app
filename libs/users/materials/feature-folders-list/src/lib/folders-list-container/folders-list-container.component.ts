import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;

  ngOnInit(): void {
    this.materialsFacade.init();
  }

  onDeleteFolder(folder: IFolder) {
    this.materialsFacade.deleteFolder(folder.id);
  }
}
