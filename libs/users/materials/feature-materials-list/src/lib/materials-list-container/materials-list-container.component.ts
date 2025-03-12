import { ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FolderDTO, FoldersFacade, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { ActivatedRoute, Router } from '@angular/router';
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
import { filter } from 'rxjs';
import { MaterialsListVM } from '../materials-list/materials-list-view-model';

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

  @Input({ required: true })
  public folder!: FolderDTO;
  vm!: MaterialsListVM;

  public foldersFacade = inject(FoldersFacade)  
  folders$ = this.foldersFacade.allFolders$;
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;
  private readonly route = inject(ActivatedRoute);
  folderId: number | null = null;
  folderTitle: string | null = null;
    
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const folderId = +params['id']; 
      if (!isNaN(folderId)) { 
        this.folderId = folderId;  
        this.foldersFacade.openedFolder(folderId); 
      }
    });

    this.materialsFacade.init()

        this.openedFolder$.subscribe(openedFolder => {
          this.vm = {
            openedFolder,
            materials: [],
            status: 'loading',
            errors: null,
          };
        });
  }
  
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
        )
        .subscribe();
        };
    }
