import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsContentComponent } from '@users/feature-materials-list';
import { tap } from 'rxjs';
import { SharedFacade } from '../../../../data-access/src/lib/+state/sharedFacade';
import { MaterialsEntity } from '../../../../data-access/src/lib/models/materials.entity';
import {
  MaterialsAddButtonComponent
} from '../../../../feature-materials-create/src/lib/materials-add-button/materials-add-button.component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    MatIconModule,
    MaterialsAddButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  public facade =  inject(SharedFacade);
  public readonly  materials$ = this.facade.materialsForOpenedFolder$
    .pipe(
      tap(materials => console.log('materials:', materials))
    );
  public readonly status$ = this.facade.statusMaterials$;
  public readonly errors$ = this.facade.errorsMaterials$;
  public readonly folder$ = this.facade.openedFolders$;
  public readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.facade.initFoldersAndMaterials();
  }

  public goBack(): void {
    this.router.navigate(['/materials']);
  }

  public onViewMaterial(material: MaterialsEntity) {
    console.log("selected material:", material)

    this.dialog.open(MaterialsContentComponent, {
      data: {materialLink:  material.materialLink, title: material.title },
    }).afterClosed().subscribe(() => {
      console.log('Дилоговое олкно закрыто')
    });
  }

  public onDeleteMaterial(material: MaterialsEntity) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      {
        data: { dialogText: `Вы уверены, что хотите удалить материал ${material.title}?`},
      });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed: boolean) => {
      if (confirmed) this.facade.deleteMaterials(material.id);
    })
  }
}
