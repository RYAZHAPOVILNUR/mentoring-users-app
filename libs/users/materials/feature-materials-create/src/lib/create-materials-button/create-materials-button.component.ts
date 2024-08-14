import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateUserDTO } from '@users/core/data-access';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsButtonComponent {
  private name!: string;
  private readonly materialsFacade = inject(MaterialsFacade);
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public openAddMaterialDialog(): void {
    const dialogRef: MatDialogRef<CreateMaterialsDialogComponent> = this.dialog.open(CreateMaterialsDialogComponent, {
      data: { name: this.name },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterialData: CreateUserDTO = {
            name: result.name,
            email: result.email,
            purchaseDate: new Date().toString(),
            educationStatus: 'trainee',
          };
          // this.materialsFacade.addFolder(newMaterialData);
        }
      });
  }
}
