import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateFoldersButtonComponent } from '@users/materials/feature-folders-create';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective, PushPipe } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { map } from 'rxjs/operators';
import { FoldersListViewModel } from '../folders-list/folders-list-view-model';
import { UsersListComponent } from '@users/feature-users-list';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    CreateFoldersButtonComponent,
    LetDirective,
    FoldersListComponent, PushPipe, UsersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.materialsFacade.status$;
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly errors$ = this.materialsFacade.error$;

  constructor() {
    this.materialsFacade.loadFolder()
  }
}
