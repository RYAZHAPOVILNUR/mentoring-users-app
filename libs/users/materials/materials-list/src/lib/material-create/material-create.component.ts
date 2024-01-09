import { Component, Input, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MaterialService } from '@users/materials/data-access';
import { Observable } from 'rxjs';
import { IMaterial } from '@users/materials/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { DialogRef } from '@angular/cdk/dialog';
import { Inject } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IFolder } from '@users/materials/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-material-create',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './material-create.component.html',
  styleUrls: ['./material-create.component.scss'],
})
export class MaterialCreateComponent {
  constructor(
    public dialogRef: MatDialogRef<MaterialCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    if (this.data?.material) {
      this.isNew = false;
    }
  }

  myForm: FormGroup = new FormGroup({
    title: new FormControl(
      this.data?.material?.title ?? '',
      Validators.required
    ),
    material_link: new FormControl(this.data?.material?.material_link ?? '', [
      Validators.required,
      Validators.pattern(/^(https:\/\/|www\.).+$/),
    ]),
  });
  //   export interface IMaterialPost {
  //   title: string;
  //   material_link: string;
  //   folder_id: number;
  // }

  isNew = true;

  onSubmit(): void {
    this.data = {
      title: this.myForm.value.title,
      material_link: this.myForm.value.material_link,
      folder_id: this.data?.folder_id,
    };
    console.log(this.myForm.value.title);
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
