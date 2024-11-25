import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMaterialsButtonComponent {
  private readonly title!: string;
  private readonly url!: string;
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  public openAddMaterialDialog(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const dialogRef: MatDialogRef<CreateMaterialsDialogComponent> = this.dialog.open(CreateMaterialsDialogComponent, {
      data: {
        buttonText: button.innerText,
        title: this.title,
        url: this.url,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterialData: CreateMaterial = {
            title: result.title,
            material_link: result.url,
            folder_id: Number(window.location.href.split('/').pop()),
          };

          // this.materialsFacade.addMaterial(newMaterialData)
        }
      })
  }
}
