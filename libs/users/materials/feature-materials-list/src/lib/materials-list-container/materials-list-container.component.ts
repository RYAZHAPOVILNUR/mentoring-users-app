import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsFacade } from '@materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsDTO } from '@users/core/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MaterialsAddDialogComponent } from '@users/materials/feature-materials-create';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    MaterialsAddDialogComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.materialsFacade.init();
  }

  public status$ = this.materialsFacade.selectStatus$;
  public materials$ = this.materialsFacade.allMaterials$;
  public folderName$ = of(this.activatedRoute.snapshot.params['folderName']);

  onDeleteClick(material: MaterialsDTO) {
    this.materialsFacade.removeMaterial(material.id);
  }

  public closeFolder() {
    this.router.navigate(['/materials']);
  }

  public openDialog(type: string) {
    this.dialog
      .open(MaterialsAddDialogComponent, {
        data: type,
        width: '500px',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((req) => req && this.materialsFacade.addMaterial(req));
  }

  public openMaterial(material: MaterialsDTO) {
    console.log(material.material_link);
    this.dialog.open(MaterialsContentComponent, {
      data: material,
      height: 'auto',
      width: 'auto',
    });
  }
}
