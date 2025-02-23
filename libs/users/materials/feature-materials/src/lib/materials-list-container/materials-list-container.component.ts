import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MaterialsListComponent } from "../materials-list/materials-list.component";
import { Material, MaterialsFacade } from "@users/materials/data-access";
import { LetDirective } from "@ngrx/component";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogMaterialComponent } from "../mat-dialog-material/mat-dialog-material.component";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { MaterialsContentComponent } from "@users/materials-content";

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./materials-list-container.component.html",
    imports: [MaterialsListComponent, LetDirective, CommonModule ]
})

export class MaterialsListContainerComponent implements OnInit{
    private readonly materialsFacade = inject(MaterialsFacade);
    private readonly router = inject(Router)
    readonly dialog = inject(MatDialog);


    public readonly openedFolder$ = this.materialsFacade.openedFolder$
    public readonly allMaterials$ = this.materialsFacade.allMaterials$

    ngOnInit(): void {
        this.materialsFacade.loadMaterails()
        this.materialsFacade.loadFolderId();
    }

    foldersBack(): void {
        this.router.navigate(['/materials']);
    }

    addMaterial(format: string): void {
        const dialogRef = this.dialog.open(DialogMaterialComponent, {
            data: {
                format,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.materialsFacade.loadMaterail(result)
        });
    }
    
    deleteMaterial(material: Material): void {
        const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
             data: {dialogText: `Вы уверены, что хотите удалить ${material.title}`},
        });
       
        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.materialsFacade.deleteMaterial(material.id)
            }
        });
    }

    openMaterialCard(material: Material) {
        const dialogRef = this.dialog.open(MaterialsContentComponent, {
            data: {
                material
            },
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              result
            }
          });
    }
}