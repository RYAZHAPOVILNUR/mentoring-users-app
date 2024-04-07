import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'users-materials-add-gialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-gialog.component.html',
  styleUrls: ['./materials-add-gialog.component.scss'],
})
export class MaterialsAddGialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data? : { materialType: string }
  ){}
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddGialogComponent>)
  

  materialForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    material_link: new FormControl('', [Validators.required, checkingLinksForValidators()]),
  })

  closeDialog(){
    this.dialogRef.close();
  }
}
import { checkingLinksForValidators } from '@users/materials/data-access';

