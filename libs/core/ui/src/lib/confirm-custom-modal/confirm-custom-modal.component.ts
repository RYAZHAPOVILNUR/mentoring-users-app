import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-confirm-custom-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-custom-modal.component.html',
  styleUrls: ['./confirm-custom-modal.component.scss']
})
export class ConfirmCustomModalComponent {
  public data: { dialogDescription: string, dialogButtonText: string } = inject(MAT_DIALOG_DATA);
  public dialogDescription: string = this.data.dialogDescription;
  public dialogButtonText: string = this.data.dialogButtonText;
}
