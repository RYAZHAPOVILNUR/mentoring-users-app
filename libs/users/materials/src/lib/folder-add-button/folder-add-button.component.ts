import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FolderAddDialogComponent } from '../folder-add-dialog/folder-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { IAddFolder, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'user-folder-add-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './folder-add-button.component.html',
  styleUrls: ['./folder-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddButtonComponent {
  readonly dialog = inject(MatDialog);
  // private readonly materialsFacade = inject(MaterialsFacade);
  folderTitle: string = '';

  openDialog() {
    const dialogRef = this.dialog.open(FolderAddDialogComponent, { data: { folderTitle: this.folderTitle } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Dialog result: ${result}`);
        // const newFolder: IAddFolder = {
        //   title: result.folderTitle,
        // };
        // Send new Folder title to Facsde
        // this.materialsFacade.addFolder(newFolder);
      }
    });
  }
}
