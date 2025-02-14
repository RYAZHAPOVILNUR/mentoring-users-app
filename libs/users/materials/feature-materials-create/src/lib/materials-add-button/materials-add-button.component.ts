import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateMaterialDTO, FoldersFacade, MaterialsFacade } from '@users/materials/data-access';
import { take } from 'rxjs';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatListModule, TranslateModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  public dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly openedFolderId$ = this.foldersFacade.openedFolderId$;
  public isSelectOpen = false;

  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen;
  }

  openAddMaterialDialog(fileType: string): void {
    this.toggleSelect();

    this.openedFolderId$.pipe(take(1)).subscribe((folderId) => {
      if (!folderId) return;

      const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
        data: { type: fileType },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const materialData: CreateMaterialDTO = {
            title: result.title,
            material_link: result.url,
            folder_id: folderId,
          };

          this.materialsFacade.addMaterial(materialData);
        }
      });
    });
  }
}
