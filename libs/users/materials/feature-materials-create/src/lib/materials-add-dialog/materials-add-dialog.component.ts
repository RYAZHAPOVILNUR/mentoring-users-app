import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialRes } from '@users/materials/data-access';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent { 
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly formBuilder = inject(FormBuilder);
  public readonly formGroup: FormGroup = this.formBuilder.group({
    inputName: this.formBuilder.control('', {nonNullable: true, validators: [Validators.required]}),
    inputRef: this.formBuilder.control('', {nonNullable: true, validators: this.getValidators()})
  });
  
  public onCloseDialog(){
    this.dialogRef.close()
  };

  public save(){
    const newMaterialData: MaterialRes = {
      title: this.formGroup.value.inputName, 
      material_link: this.formGroup.value.inputRef, 
      folder_id: this.data.folderId
    }
    this.dialogRef.close(newMaterialData)
  }

  private getValidators(){
    if(this.data.name === 'PDF'){
      return [Validators.required, Validators.pattern(/...\.pdf$/)]
    } else if(this.data.name === 'Аудио'){
      return [Validators.required, Validators.pattern(/...\.mp3$/)]
    } else if(this.data.name === 'Видео'){
      return [Validators.required, Validators.pattern(/youtube\.com|youtu\.be\//)]
    }
    else return [Validators.required]
  }
}
