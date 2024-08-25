import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Folder, MaterialVM, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public openedFolder!: Folder;
  public readonly foldersMaterials$ = this.materialsFacade.foldersMaterials$;
  public readonly loadingStatus$ = this.materialsFacade.loadingStatus$;
  public readonly error$ = this.materialsFacade.error$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$
  // public readonly openedFolder$: Observable<Folder | null> = this.materialsFacade.openedFolder$.pipe(
  //   tap((folder) => {
  //     console.log('openedFolder runs in mat list cont', folder);
  //     if (!folder) {
  //       this.materialsFacade.loadFolders();
  //     }
  //   })
  // );
  // public readonly openedFolder$: Observable<Folder | null> = this.materialsFacade.openedFolder$.pipe(
  //   tap((folder) => {
  //     console.log('openedFolder runs in mat list cont', folder);
  //     if (!folder) {
  //       this.materialsFacade.loadFolder();
  //     }
  //   })
  // );

  constructor() {
    this.openedFolder$.pipe(takeUntilDestroyed()).subscribe(
      (folder) => {
        if(folder) {
          this.materialsFacade.loadMaterials();
        }
        if (!folder) {
        this.materialsFacade.loadFolder();
      }
      }
    )
  }

  onRedirectToFoldersList() {
    this.router.navigate(['/materials']);
  }

  onOpenMaterialFile(material: MaterialVM) {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onDeleteMaterial(material: MaterialVM) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить «${material.title}»?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialsFacade.deleteMaterial(material.id);
      }
    });
  }
}
