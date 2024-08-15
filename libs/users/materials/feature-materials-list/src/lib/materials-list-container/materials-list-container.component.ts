import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialVM, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router)
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef);
  public readonly foldersMaterials$ = this.materialsFacade.foldersMaterials$;
  public readonly loadingStatus$ = this.materialsFacade.loadingStatus$
  public readonly openedFolder$ = this.materialsFacade.openedFolder$

  constructor() {
    this.materialsFacade.loadMaterials();
    this.foldersMaterials$.subscribe(foldersMaterials => console.log('foldersMaterials in container', foldersMaterials))
  }

  onRedirectToFoldersList() {
    this.router.navigate(['/materials'])
  }

  onOpenMaterialFile(material: MaterialVM) {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(
      MaterialsContentComponent, {
        data: {material}
      }
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
