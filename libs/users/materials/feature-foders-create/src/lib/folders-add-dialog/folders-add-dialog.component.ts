import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent implements OnInit {
  public dialogForm!: FormGroup;
  private dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  ngOnInit(): void {
    this.dialogForm = new FormGroup({
      title: new FormControl(''),
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.dialogForm.value);
  }
}
