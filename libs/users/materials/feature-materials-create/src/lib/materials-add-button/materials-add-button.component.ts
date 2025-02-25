import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewFolder, AddNewMaterialReq, FoldersFacade, MaterialInterface } from '@users/materials/data-access';
import { MatMenuModule } from '@angular/material/menu';
import { FoldersAddDialogComponent } from '@feature-folders-create';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MaterialsAddPdfDialogComponent
} from '../materials-add-dialog/materials-add-pdf-dialog/materials-add-pdf-dialog.component';
import {
  MaterialsAddVideoDialogComponent
} from '../materials-add-dialog/materials-add-video-dialog/materials-add-video-dialog.component';
import {
  MaterialsAddPodcastDialogComponent
} from '../materials-add-dialog/materials-add-podcast-dialog/materials-add-podcast-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Input() folderId!: number
  private title!: string;
  private materialLink!: string
  public dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);



  addVideoDialog() {
    const dialogRef: MatDialogRef<MaterialsAddVideoDialogComponent> = this.dialog.open(
      MaterialsAddVideoDialogComponent, {
        data: { title: this.title, materialLink: this.materialLink }
      }
    );
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      result => {
        if (result?.title?.trim() && result?.materialLink?.trim()) {
          const newMaterialFolderData: AddNewMaterialReq = {
            title: result.title.trim(),
            material_link: result.materialLink.trim(),
            folder_id: this.folderId
          };
          this.foldersFacade.addNewMaterialFolder(newMaterialFolderData);
        }
      }
    );
  }

  addPdfDialog() {
    const dialogRef: MatDialogRef<MaterialsAddPdfDialogComponent> = this.dialog.open(
      MaterialsAddPdfDialogComponent, {
        data: { title: this.title, materialLink: this.materialLink }
      }
    );
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      result => {
        if (result?.title?.trim() && result?.materialLink?.trim()) {
          const newMaterialFolderData: AddNewMaterialReq = {
            title: result.title.trim(),
            material_link: result.materialLink.trim(),
            folder_id: this.folderId
          };
          this.foldersFacade.addNewMaterialFolder(newMaterialFolderData);
        }
      }
    );
  }

  addPodcastDialog() {
    const dialogRef: MatDialogRef<MaterialsAddPodcastDialogComponent> = this.dialog.open(
      MaterialsAddPodcastDialogComponent, {
        data: { title: this.title, materialLink: this.materialLink }
      }
    );
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      result => {
        if (result?.title?.trim() && result?.materialLink?.trim()) {
          const newMaterialFolderData: AddNewMaterialReq = {
            title: result.title.trim(),
            material_link: result.materialLink.trim(),
            folder_id: this.folderId
          };
          this.foldersFacade.addNewMaterialFolder(newMaterialFolderData);
        }
      }
    );
  }
}
