import { Component, DestroyRef, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  @Input({required: true}) folder!: Folder;
  private readonly materialFacad = inject(MaterialsFacade)
  private readonly dialogAdd = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public addMat(name: string){
    this.dialogAdd.open(MaterialsAddDialogComponent, {
      data: {
        name: name,
        folderId: this.folder.id
      }
    }).afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((newMaterialData) => {
          if (newMaterialData) {
            this.materialFacad.addMaterial(newMaterialData)
          }
        })
  }
}
