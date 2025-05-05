import { Component,ChangeDetectionStrategy,Inject,inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IAddFolder } from "libs/users/materials/data-access/src/lib/models/folders/folders-add.model";

@Component({
    selector:'folders-add-dialog',
    standalone:true,
    templateUrl: './folders-add-dialog.component.html', 
    styleUrls: ['./folders-add-dialog.component.scss'] ,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
})

export class FoldersAddDialogComponent{
  public folderAddFormGroup: FormGroup;
    private formBuilder = inject(FormBuilder);
    public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: { folderName: string }) {
      this.folderAddFormGroup = this.formBuilder.group({
        folderName: ['', Validators.required],
      });
    }
  
  
  
    public save(): void {
      if (this.folderAddFormGroup.valid) {
        const formData: IAddFolder = {
          title: this.folderAddFormGroup.value.folderName,
        };
        this.dialogRef.close(formData);
      }
    }

    cancel(): void {
      this.dialogRef.close();
    }
}