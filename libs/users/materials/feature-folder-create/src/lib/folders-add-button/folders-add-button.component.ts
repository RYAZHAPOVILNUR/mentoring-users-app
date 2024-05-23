import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class FoldersAddButtonComponent {
  private readonly dialogAdd = inject(MatDialog);

  public addFolder(){
    this.dialogAdd.open(FoldersAddDialogComponent)
  }
}
