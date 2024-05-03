import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  public dialogRef = inject(MatDialogRef)
  public inputName = new FormControl({value: '', disabled: false}, [Validators.required]);
  materialsFaced = inject(MaterialsFacade);

  onCloseDialog(){
    this.dialogRef.close()
  }

  onSave(){
    this.dialogRef.close();
    this.materialsFaced.add(this.inputName.value!)
  }
}
