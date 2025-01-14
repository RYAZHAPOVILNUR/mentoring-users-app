import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@materials/feature-materials-create';
import { FoldersEntity, FoldersFacade, MaterialsEntity, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import {ActivatedRoute} from '@angular/router';
import {
  MaterialsListComponent
} from '../materials-list/materials-list.component';
import { CreateFolderButtonComponent } from '@materials/feature-folders-create';
import { FoldersListComponent } from '@materials/feature-folder-list';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    CreateMaterialsButtonComponent,
    LetDirective,
    MaterialsListComponent,
    CreateFolderButtonComponent,
    FoldersListComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  public folder_id: number = this.route.snapshot.params['id'];
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  public materials$ = this.materialsFacade.getMaterialsByFolder(this.folder_id);
  public readonly folder$:Observable<FoldersEntity | undefined>

  constructor() {
    this.folder$ = this.foldersFacade.getFolderById(this.folder_id);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.folder_id = Number(params.get('id'));
      this.materials$ = this.materialsFacade.getMaterialsByFolder(this.folder_id);

    });

    this.materialsFacade.init();
  }
}
