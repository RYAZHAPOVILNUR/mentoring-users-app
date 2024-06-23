import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaterialsAddDialogComponent {
  public type!: string;
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  private readonly fb = inject(FormBuilder);
  public readonly formGroup = this.fb.group({
    title: ['', Validators.required],
    url: ['', Validators.required],
  });

  public onAddMaterial() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  private validateUrl();
}
