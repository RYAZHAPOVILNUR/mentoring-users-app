import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialType } from '@users/materials/data-access';
import { MaterialsValidators } from '../materials-validators';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaterialsAddDialogComponent implements OnInit {
  protected readonly MaterialType = MaterialType;
  public type!: string;
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private readonly fb = inject(FormBuilder);
  public formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, MaterialsValidators.ofType(this.type)]],
    });
  }

  public onAddMaterial() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
