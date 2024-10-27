import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { MaterialsVM } from '@users/materials';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MaterialsAddButtonComponent,
  MaterialsAddDialogComponent
} from '@users/materials/feature-materials-create';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MaterialsListComponent,
    FoldersAddButtonComponent,
    MaterialsAddButtonComponent,
    MaterialsAddDialogComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent implements OnInit {
  public materialsFacade = inject(MaterialsFacade);
  public materials$!: Observable<MaterialsVM[]>;
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  public router = inject(Router);


  public folderId$ = this.route.paramMap.pipe(
    map(params => {
      const folderIdParam = params.get('id');
      return folderIdParam ? +folderIdParam : null;
    })
  );

  ngOnInit(): void {
    this.materials$ = this.folderId$.pipe(
      switchMap(folderId => {
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

  public onAddMaterial(): void {
    this.folderId$.pipe(
      take(1),
      tap(folderId => console.log('Folder ID before opening dialog:', folderId))
    )
      .subscribe(folderId => {
        if (folderId !== null) {
          const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
            data: { folderId }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.materialsFacade.loadMaterials(folderId);
            }
          });
        } else {
          console.error('Folder ID is null');
        }
      });
  }

  public onDeleteMaterial(materialId: number): void {
    this.materialsFacade.deleteMaterial(materialId);
  }

  public onBackClick(): void {
    this.router.navigate(['/materials']);
  }
}
