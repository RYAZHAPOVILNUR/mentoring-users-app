import { Component, Input, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Observable } from 'rxjs';
import { IMaterial } from '../../../../data-access/src/lib/models/imaterial';
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
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IFolder } from '../../../../data-access/src/lib/models/ifolder';
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
    title: new FormControl(this.data?.material?.title ?? ''),
    material_link: new FormControl(this.data?.material?.material_link ?? ''),
  });
  //   export interface IMaterialPost {
  //   title: string;
  //   material_link: string;
  //   folder_id: number;
  // }

  isNew: boolean = true;

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
