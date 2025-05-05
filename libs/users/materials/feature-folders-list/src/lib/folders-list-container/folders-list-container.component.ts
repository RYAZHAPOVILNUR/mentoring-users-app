import { Component,ChangeDetectionStrategy,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { UsersFacade } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.facade';
import { FoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  selector: 'app-folders-list-container', 
  templateUrl: './folders-list-container.component.html', 
  styleUrls: ['./folders-list-container.component.scss'] ,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule,FoldersAddButtonComponent,FoldersListComponent],


})
export class FoldersListContainerComponent {
    private readonly FoldersFacade = inject(UsersFacade);
    // public folders$ = this.FoldersFacade.folders$;
    // public status$ = this.FoldersFacade.foldersStatus$;
    // public errors$ = this.materialsFacade.foldersErrors$;
    // private readonly dialog = inject(MatDialog);
    // private readonly destroyRef = inject(DestroyRef);
    // private readonly router = inject(Router);
  
    ngOnInit(): void {
      this.FoldersFacade.initFolders();
    }
 
}
