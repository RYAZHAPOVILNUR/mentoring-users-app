import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsVM } from './materials-content-feature.model';
import { LetDirective } from '@ngrx/component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Material, selectOpenedFolder } from '@users/materials/data-access';
import { MaterialsContentViewComponent } from '../materials-content-view/materials-content-view.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-materials-content-feature',
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
  templateUrl: './materials-content-feature.component.html',
  styleUrl: './materials-content-feature.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentFeatureComponent {
  @Input({ required: true }) vm!: MaterialsVM;
  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);



  public openMaterialContent(material: Material): void {
    const dialogRef: MatDialogRef<MaterialsContentViewComponent> =
      this.matDialog.open(MaterialsContentViewComponent, {
        data: { material },
      });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
