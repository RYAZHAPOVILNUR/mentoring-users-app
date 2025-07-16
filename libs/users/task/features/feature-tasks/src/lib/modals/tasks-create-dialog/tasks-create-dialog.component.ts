import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-tasks-create-dialog',
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
  templateUrl: './tasks-create-dialog.component.html',
  styleUrls: ['./tasks-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCreateDialogComponent {
  private dialogRef = inject(MatDialogRef<TasksCreateDialogComponent>);

  public task = '';

  public create(): void {
    this.dialogRef.close(this.task);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
