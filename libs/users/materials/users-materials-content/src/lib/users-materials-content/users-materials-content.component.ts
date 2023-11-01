import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LetDirective } from '@ngrx/component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewMaterialContentDialogComponent } from '../view-material-content-dialog/view-material-content-dialog.component';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { AddMaterialDialogComponentComponent } from '../add-material-dialog-component/add-material-dialog-component.component';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialsVM } from './users-materials-content-model';


@Component({
  selector: 'users-users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './users-materials-content.component.html',
  styleUrls: ['./users-materials-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsContentComponent {
  @Input({required: true}) vm!: MaterialsVM;

  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private materialsFacade = inject(MaterialsFacade);

  public openMaterialContent(material: Material): void {
    const dialogRef: MatDialogRef<ViewMaterialContentDialogComponent> =
      this.matDialog.open(ViewMaterialContentDialogComponent, {
        data: { material },
      });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public openAddMaterial(): void {
    const dialogRef: MatDialogRef<AddMaterialDialogComponentComponent> =
      this.matDialog.open(AddMaterialDialogComponentComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((newMaterial) => !!newMaterial)
      )
      .subscribe((newMaterial) =>
        this.materialsFacade.addMaterial(newMaterial)
      );
  }

  deletedMaterial(id: number) {
    this.materialsFacade.deleteMaterial(id);
  }
}
