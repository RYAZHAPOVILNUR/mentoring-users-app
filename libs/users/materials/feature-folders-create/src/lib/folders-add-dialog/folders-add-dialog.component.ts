import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {}
