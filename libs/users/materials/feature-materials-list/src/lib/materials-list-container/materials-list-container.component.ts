import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade, MaterialsFacade, MaterialsType } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);

   private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.materialsStatus$;
  public readonly error$ = this.materialsFacade.error$;
  public readonly title$ = this.foldersFacade.titleFolder$;

  constructor() {
    this.materialsFacade.initMaterials();
  }

    public deleteMaterial(material: MaterialsType): void {
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

}
