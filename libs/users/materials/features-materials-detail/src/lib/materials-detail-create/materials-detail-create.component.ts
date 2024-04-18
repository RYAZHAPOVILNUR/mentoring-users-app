import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsDetailDialogComponent } from '../materials-detail-dialog/materials-detail-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'users-materials-detail-create',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule],
  templateUrl: './materials-detail-create.component.html',
  styleUrls: ['./materials-detail-create.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDetailCreateComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialFacade = inject(MaterialsFacade);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  folderId?: any;

  ngOnInit() {
    this.folderId = this.route.snapshot.params['id'];
  }

  openAddMaterialDialog(type: string): void {
    const dialogRef: MatDialogRef<MaterialsDetailDialogComponent> = this.dialog.open(MaterialsDetailDialogComponent, {
      data: { type },
      // width: '400px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (this.folderId && data) {
          this.materialFacade.onCreateMaterial({ ...data, folder_id: Number(this.folderId) });
        }
      });
  }
}
