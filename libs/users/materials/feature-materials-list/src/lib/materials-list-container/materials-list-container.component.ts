import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@materials/feature-materials-create';
import { FoldersEntity, FoldersFacade, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent, LetDirective, MaterialsCardComponent],
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
  public readonly folder$: Observable<FoldersEntity | undefined>;

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
