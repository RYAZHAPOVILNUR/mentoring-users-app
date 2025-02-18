import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialInterface } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {

  addMaterialFolderDialog() {
    // const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(
    //   FoldersAddDialogComponent, {
    //     data: { title: this.title }
    //   }
    // );
    // dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
    //   result => {
    //     if (result?.title?.trim()) {
    //       const newFolderData: AddNewFolder = {
    //         title: result.title.trim()
    //       };
    //       this.foldersFacade.addNewFolder(newFolderData);
    //     }
    //   }
    // );
  }
}
