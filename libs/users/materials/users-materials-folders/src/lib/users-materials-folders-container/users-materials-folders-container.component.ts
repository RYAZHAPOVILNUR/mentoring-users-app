import { MaterialsFacade } from './../../../../data-access/src/lib/+state/materials.facade';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMaterialsFoldersComponent } from '../users-materials-folders/users-materials-folders.component';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-users-materials-folders-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersMaterialsFoldersComponent,
    LetDirective,
    MatProgressBarModule,
    PushPipe,
  ],
  templateUrl: './users-materials-folders-container.component.html',
  styleUrls: ['./users-materials-folders-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsFoldersContainerComponent {

  public router = inject(Router);
  public materialsFacade = inject(MaterialsFacade);
  public status$ = this.materialsFacade.getStatus$
  public folders$ = this.materialsFacade.allFolders$;
  public openedFolder$ = this.materialsFacade.openedFolder$;

  ngOnInit(){
    this.materialsFacade.getFolders()
  }

  setOpenedFolder(id: number) {
    this.router.navigate(['/materials/', id]);
  }
  onDeleteFolder(id:number){
this.materialsFacade.deleteFolder(id)
  }

  onAddFolder(folderName: string) {
    const newFolder = {
      title: folderName,
      material_id: 0,
    };
    this.materialsFacade.addFolder(newFolder);
  }
}
