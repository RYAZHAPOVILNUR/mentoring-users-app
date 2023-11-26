import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaterial, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;

  constructor() {
    this.materialsFacade.loadMaterials()
  }

  public deleteMaterial(material: IMaterial): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` } }
    )

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if(result) this.materialsFacade.deleteMaterial(material.id)
        })
      )
      .subscribe()
  }

  public backOnFolders() {
    this.router.navigate(['/materials'])
  }
}
