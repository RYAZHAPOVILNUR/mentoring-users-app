import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { CreateMaterialDTO, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, tap } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialsListComponent, 
    LetDirective, 
    MaterialsAddButtonComponent, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit{

  public materialsFacade = inject(MaterialsFacade)
  private readonly router = inject(Router);
  public material!: MaterialDTO;
  private readonly store = inject(Store);
  materials$ = this.materialsFacade.allMaterials$;
  status$ = this.materialsFacade.status$;
  errors$ = this.materialsFacade.errors$;
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.materialsFacade.init()
  }
  
  // ngOnInit(): void {
  //   this.materialsFacade.loadMaterial()
  // }
  
  // onRedirectToMaterials(id: number) {
  //   this.router.navigate(['/materials', id]);
  // }

  onDeleteMaterial(material: MaterialDTO) {
    this.materialsFacade.deleteMaterial(material.id);
  }

  onBackToFolder(): void {
    this.router.navigate(['/materials']);
  }

  onOpenMaterial(material: MaterialDTO): void {
      const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent);
      dialogRef
        .afterClosed()
        .pipe(
          filter(Boolean), 
          // tap((result: CreateMaterialDTO) => this.materialsFacade.loadMaterial(result))
        )
        .subscribe();
        };
    }

  // onOpenMaterial(material: MaterialDTO){
  //   this.materialsFacade.openMaterial(material.id);
  // }

  // public readonly material$: Observable<MaterialDTO | null> = this.materialsFacade.openedMaterial$.pipe(
  //   tap((material) => {
  //     if (!material) {
  //       this.materialsFacade.loadMaterial();
  //     } else {
  //       this.material = material;        }
  //     })
  //   );

  // public readonly editMode$: Observable<boolean> = this.store.pipe(
  //   select(selectQueryParam('edit')),
  //   map((params) => params === 'true')
  // );

  // public onEditMaterial(materialData: CreateMaterialDTO, onSuccessCb: onSuccessEditionCbType) {
  //   this.materialsFacade.editMaterial(materialData, this.folder.id, onSuccessCb);
  //   this.router.navigate(['/material', this.folder.id], {
  //     queryParams: { edit: false },
  //   });
  // }
  

  // public material!: MaterialsEntity;
  // private readonly dialog = inject(MatDialog);
  // private readonly destroyRef = inject(DestroyRef);

  // public readonly material$: Observable<MaterialsEntity | null> = this.materialsFacade.openedMaterial$.pipe(
  //   tap((material) => {
  //     if (!material) {
  //       this.materialsFacade.loadMaterial();
  //     } else {
  //       this.material = material;
  //     }
  //   })
  // );
  // public readonly status$ = this.materialsFacade.status$;

// }
