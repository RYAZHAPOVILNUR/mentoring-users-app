import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { MaterialFacade } from '@users/materials/data-access';
import { FolderListComponent } from '../folder-list/folder-list.component';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'users-folder-list-container',
  templateUrl: './folder-list-container.component.html',
  styleUrls: ['./folder-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetDirective, FolderListComponent],
})
export class FolderListContainerComponent implements OnInit {
  private readonly materialFacade: MaterialFacade = inject(MaterialFacade);
  private readonly router = inject(Router);

  public readonly folders$ = this.materialFacade.allFolders$;
  public readonly status$ = this.materialFacade.status$;
  public readonly error$ = this.materialFacade.error$;

  public ngOnInit(): void {
    this.materialFacade.loadFolders();
  }

  public onDeleteFolder(id: number) {
    this.materialFacade.deleteFolder(id);
  }

  public onOpenFolder(folder: Folder) {
    this.materialFacade.setOpenedFolder(folder);
    this.router.navigate(['/materials', folder.id]);
  }
}
