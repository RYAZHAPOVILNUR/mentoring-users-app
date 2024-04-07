import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { LetDirective } from '@ngrx/component';
import { Folder, MaterialFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    FoldersAddButtonComponent,
    LetDirective,
    AsyncPipe,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  private readonly MaterialsFacade = inject(MaterialFacade);
  private readonly router = inject(Router);
  public readonly allFolders$ = this.MaterialsFacade.folders$;
  public readonly status$ = this.MaterialsFacade.statusFolders$;
  public readonly error$ = this.MaterialsFacade.errorFolder$;
  

  constructor(){
    this.MaterialsFacade.initFolders();
  }

  deleteFolder(id: number){
    this.MaterialsFacade.deleteFolder(id);
  }
  onRedirectToFolder(folder: Folder){
    this.router.navigate([this.router.url, folder.id], {
      queryParams:{
        id: folder.id,
        title: folder.title
      }
    });
  }
}
