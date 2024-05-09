import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsFacade, MatRes } from '@users/materials/data-access';
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
  public dialogRef = inject(MatDialogRef);
  public inputName = new FormControl({value: '', disabled: false}, [Validators.required]);
  public inputRef = new FormControl({value: '', disabled: false}, [Validators.required, 
    (this.data.name == 'PDF' ? Validators.pattern(/...\.pdf$/) : Validators.required),
    (this.data.name == 'Аудио' ? Validators.pattern(/...\.mp3$/) : Validators.required),
    (this.data.name == 'Видео' ? Validators.pattern(/www.youtube.com/) : Validators.required)
  ]);
  materialsFaced = inject(MaterialsFacade);
  
  onCloseDialog(){
    this.dialogRef.close()
  };

  onSave(){
    const res: MatRes = {title: this.inputName.value, material_link: this.inputRef.value, folder_id: this.data.folderId}
    this.materialsFaced.addMat(res);  
    this.dialogRef.close()
  }
}
