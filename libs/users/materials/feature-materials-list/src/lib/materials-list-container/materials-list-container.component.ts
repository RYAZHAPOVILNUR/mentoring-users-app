import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MaterialsFacade } from '@materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsDTO } from '@users/core/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
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
  constructor() {
    this.materialsFacade.init();
    this.materialsFacade.getFolder();
  }
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public status$ = this.materialsFacade.selectStatus$;
  public materials$ = this.materialsFacade.allMaterials$;
  public folderName$ = this.materialsFacade.selectFolder$;
  public errors$ = this.materialsFacade.selectError$;

  public onDeleteClick(material: MaterialsDTO) {
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
    this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
  }
}
