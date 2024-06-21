import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsAddButtonComponent } from '@users/materials-create';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials-content';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/material.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {

  private readonly materialFacade = inject(MaterialsFacade);
  public readonly materials$ = this.materialFacade.allMaterials$;
  public readonly openedFolder$ = this.materialFacade.openedFolderName$;
  private readonly route = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.materialFacade.initMaterials();
  }

  public onDeleteMaterial(id:number) {
    this.materialFacade.deleteMaterial(id);
  }

  public onBackButton() {
    this.route.navigate(['/materials/']);
  }

  public onOpenMaterial(material:IMaterial) {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {data: material});

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
