import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  
  readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  dialogClose() {
    this.dialogRef.close();
  }
}
