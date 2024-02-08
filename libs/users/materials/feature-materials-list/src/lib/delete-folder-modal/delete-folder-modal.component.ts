import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-delete-folder-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatListModule, MatButtonModule],
  templateUrl: './delete-folder-modal.component.html',
  styleUrls: ['./delete-folder-modal.component.scss'],
})
export class DeleteFolderModalComponent {}
