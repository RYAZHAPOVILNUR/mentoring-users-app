import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@libs/users/materials/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FileFormat } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-materials-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule, MatSelectModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsButtonComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly folder_id$ = new BehaviorSubject<number | undefined>(0);

  public ngOnInit(): void {
    this.materialsFacade.folderId$.subscribe((folderId) => {
      if (typeof folderId === 'string') {
        this.folder_id$.next(+folderId);
      } else {
        this.folder_id$.next(undefined);
      }
      takeUntilDestroyed(this.destroyRef);
    });
  }

  public openAddMaterialDialog(materialFormat: FileFormat): void {
    const dialogRef: MatDialogRef<CreateMaterialsDialogComponent> = this.dialog.open(CreateMaterialsDialogComponent, {
      data: {
        dialogText: `Добавление ${materialFormat}`,
        folder_id$: this.folder_id$.value,
        materialFormat: materialFormat,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formData) => {
        if (formData) {
          this.materialsFacade.addMaterial(formData);
        }
      });
  }
}
