import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import {
  MaterialsAddButtonComponent,
  MaterialsRemoveDialogComponent
} from '@users/materials/feature-materials-create';
import { Folder, Material, MaterialCreate, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { LetDirective } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContentModel, MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, FoldersAddButtonComponent, LetDirective, MatCardModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  providers: [MaterialsFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent implements OnInit {
  private router: Router = inject(Router);
  private materialsFacade: MaterialsFacade = inject(MaterialsFacade);
  private destroyRef: DestroyRef = inject(DestroyRef);
  public materials$: Observable<Material[]> = this.materialsFacade.currentFolderMaterials$;
  public loadingStatus$: Observable<string> = this.materialsFacade.loadingStatus$;
  public currentFolderData$: Observable<Folder | null> = this.materialsFacade.currentFolderData$;
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.materialsFacade.setCurrentFolder();
    this.materialsFacade.loadMaterials();
  }

  public navigateBack(): void {
    this.router.navigate(['./materials']);
  }

  public addNewMaterial(newMaterial: MaterialCreate): void {
    if (newMaterial) {
      this.materialsFacade.addMaterial(newMaterial);
    }
  }

  public removeMaterial(eventData: { materialId: number, materialTitle: string }): void {
    const dialogRef: MatDialogRef<MaterialsRemoveDialogComponent> = this.dialog.open(MaterialsRemoveDialogComponent, {
      data: eventData
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: { delete: boolean }): void => {
        if (res) {
          if (res.delete) this.materialsFacade.removeMaterial(eventData.materialId);
        }
      });
  }

  public openMaterial(eventData: ContentModel): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {
      data: eventData,
      height: eventData.contentType === 'pdf' ? '80%' : ''
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => null);
  }
}
