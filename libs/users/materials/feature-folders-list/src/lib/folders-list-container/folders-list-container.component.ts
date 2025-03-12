import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO, FoldersFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit{
  public foldersFacade = inject(FoldersFacade)
  private readonly router = inject(Router);

  folders$ = this.foldersFacade.allFolders$;
  status$ = this.foldersFacade.status$;
  errors$ = this.foldersFacade.errors$;

  ngOnInit(): void {
    this.foldersFacade.init()
  }
  
  onDeleteFolder(folder: FolderDTO) {
    this.foldersFacade.deleteFolder(folder.id);
  }

  onRedirectToMaterials(id: number) {
    this.router.navigate(['/materials', id]);
  }

}
