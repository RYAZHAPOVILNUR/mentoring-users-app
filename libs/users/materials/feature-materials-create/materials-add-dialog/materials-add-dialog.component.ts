import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CreateMaterialDTO } from '../../data-access/src/lib/models/materials-dto.model';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent {
  dialogRef = inject(MatDialogRef);
  activateRoute = inject(ActivatedRoute);
  @Input()
  idFolder!: number; 
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    link: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ])
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: {idFolder: number}) {}

  submitMaterialAdd(){
    if(!this.form.invalid){
      const newMaterial: CreateMaterialDTO = {
        title: this.form.value.name as string,
        material_link: this.form.value.link as string,
        folder_id: this.data.idFolder 
      }
      this.dialogRef.close(newMaterial);
    }
  }
}
