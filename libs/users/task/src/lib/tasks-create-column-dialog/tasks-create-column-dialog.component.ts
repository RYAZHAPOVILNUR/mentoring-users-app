import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-tasks-create-column-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './tasks-create-column-dialog.component.html',
  styleUrls: ['./tasks-create-column-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCreateColumnDialogComponent {
  private dialogRef = inject(MatDialogRef<TasksCreateColumnDialogComponent>);

  public column = '';

  public create(): void {
    this.dialogRef.close(this.column);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
