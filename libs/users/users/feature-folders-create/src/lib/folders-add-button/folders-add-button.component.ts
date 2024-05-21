import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, FoldersAddDialogComponent, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      data: { name: '' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);

        // добавляем папку
      }
    });
  }
}
