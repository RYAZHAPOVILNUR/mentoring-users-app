import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent implements OnInit{
  private fb = inject(FormBuilder)
  public dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)

  public readonly foldersForm = this.fb.group({
    title: ['', Validators.required]
  })

  ngOnInit(): void {
    if(this.data) {
      this.foldersForm.patchValue(this.data)
    }
  }

  public onSave(): void {
    if(this.foldersForm.valid) {
      this.dialogRef.close(this.foldersForm.value);
    }
  }

  public onCancel(): void {
    this.dialogRef.close()
  }
}
