import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MaterialListComponent } from '../material-list/material-list.component';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';

@Component({
  selector: 'users-feature-materials-container',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressBarModule,
    MaterialListComponent,
    LetDirective,
    PushPipe
  ],
  templateUrl: './feature-materials-container.component.html',
  styleUrls: ['./feature-materials-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureMaterialsContainerComponent implements OnInit {
  private matDialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly facade = inject(MaterialsFacade)
  public readonly openedFolder$ = this.facade.openedFolder$
  public readonly filteredMaterials$ = this.facade.filteredMaterials$
  public readonly materialsStatus$ = this.facade.materialsStatus$
  private destroyRef = inject(DestroyRef);



  ngOnInit(): void {
    this.facade.loadMaterials()
    this.facade.loadOpenedFolderHandler().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }



  public deleteMaterial(material: MaterialEntity): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.matDialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` } }
    )

    dialogRef.afterClosed()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if(result) this.facade.deleteMaterial(material.id)
      })
    )
    .subscribe();
  }

  public backOnFolders() {
    this.router.navigate(['/materials'])
  }
}
