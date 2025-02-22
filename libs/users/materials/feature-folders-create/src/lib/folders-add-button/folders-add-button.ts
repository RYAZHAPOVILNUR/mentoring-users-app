import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  standalone: true,
  selector: 'users-folders-add-button',
  templateUrl: './folders-add-button.html',
  styleUrls: ['./folders-add-button.scss'],
  imports: [MatIconModule, MatButtonModule],
})
export class FoldersAddButtonComponent {
  @Output() folderAdded = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}

  openAddUserDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      width: '250px',
      data: { folderName: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result here, e.g., save the folder name
      console.log('Folder name:', result);
    });
  }

  addFolder() {
    this.folderAdded.emit();
    console.log('Folder added');
  }
}
