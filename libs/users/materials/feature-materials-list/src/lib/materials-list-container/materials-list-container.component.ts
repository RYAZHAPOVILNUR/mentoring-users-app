import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Observable, of, switchMap } from 'rxjs';
import { MaterialsVM } from '@users/materials';
import { ActivatedRoute } from '@angular/router';
import {
  MaterialsAddButtonComponent,
  MaterialsAddDialogComponent
} from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MaterialsListComponent,
    FoldersAddButtonComponent,
    MaterialsAddButtonComponent,
    MaterialsAddDialogComponent
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent implements OnInit {
  public materialsFacade = inject(MaterialsFacade);
  public materials$!: Observable<MaterialsVM[]>;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.materials$ = this.route.paramMap.pipe(
      switchMap(params => {
        const folderIdParam = params.get('folderId');
        const folderId = folderIdParam ? +folderIdParam : null;

        if (folderId !== null) {
          this.materialsFacade.loadMaterials(folderId);
          return this.materialsFacade.getMaterialsByFolder(folderId);
        } else {
          console.error('Folder ID is null');
          return of([]);
        }
      })
    );
  }

  public onDeleteMaterial(materialId: number): void {
    this.materialsFacade.deleteMaterial(materialId);
  }
}
