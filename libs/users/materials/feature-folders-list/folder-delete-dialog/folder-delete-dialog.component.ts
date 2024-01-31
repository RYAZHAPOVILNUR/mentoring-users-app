import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folder-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './folder-delete-dialog.component.html',
  styleUrls: ['./folder-delete-dialog.component.scss'],
})
export class FolderDeleteDialogComponent {}
